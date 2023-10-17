import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TablaService {

  private api = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }
  //Agregar un nuevo registro
  agregarRegistro(registro: any): Observable<any> {
    return this.http.post(`${this.api}/patabla`, registro).pipe(
      catchError(this.handleError)
    );
  }
  // Obtener todos los registros
  obtenerRegistros(): Observable<any> {
    return this.http.get(`${this.api}/gettabla`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener un registro por ID
  obtenerRegistroPorId(rpu: string): Observable<any> {
    return this.http.get(`${this.api}/gettabla/${rpu}`).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un registro por ID
  actualizarRegistro(id: string, registro: any): Observable<any> {
    return this.http.put(`${this.api}/actualizartabla/${id}`, registro).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un registro por ID
  eliminarRegistro(id: string): Observable<any> {
    return this.http.delete(`${this.api}/eliminartabla/${id}`).pipe(
      catchError(this.handleError)
    );
  }

private handleError(error: HttpErrorResponse) {
  const errorMessage = 'Ocurrió un error en la solicitud.';
  return throwError({ error: true, message: errorMessage });
}
}