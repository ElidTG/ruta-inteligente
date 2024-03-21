import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TablaRegistroComponent } from '../../components/tabla-registro/tabla-registro.component';

@Injectable({
  providedIn: 'root'
})
export class TablaService {

  private api ='https://ruta-inteligente-logica.onrender.com'; 

  constructor(private http: HttpClient) { }
  //Agregar un nuevo registro
  agregarRegistro(registro: any): Observable<any> {
    return this.http.post(`${this.api}/patabla`, registro).pipe(
      catchError(this.handleError)
    );
  }
  // Obtener todos los registros
  obtenerRegistros(ruta: string): Observable<any> {
    return this.http.get(`${this.api}/buscartabla/${ruta}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener un registro por ID
  obtenerRegistroPorId(rpu: string): Observable<any> {
    return this.http.get(`${this.api}/gettabla/${rpu}`).pipe(
      catchError(this.handleError)
    );
  }
//Obtener registro por NumeroM
  obtenerRegistroPorNumeroM(numeroM: string): Observable<any> {
    return this.http.get(`${this.api}/gettabla/${numeroM}`).pipe(
        catchError(this.handleError)
    );
}
buscarRegistro(criterio: string, buscarTipo: string): Observable<any> {
  let endpoint = '';
  if (buscarTipo === 'NumeroM') {
    endpoint = `gettabla/${criterio}`;
  } else if (buscarTipo === 'rpu') {
    endpoint = `gettabla/${criterio}`;
  }

  return this.http.get(`${this.api}/${endpoint}`).pipe(
    catchError(this.handleError)
  );
}

  // Actualizar un registro por ID
  actualizarRegistro(rpu: string, registro: any): Observable<any> {
    return this.http.post(`${this.api}/actualizartabla/${rpu}`, registro).pipe(
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