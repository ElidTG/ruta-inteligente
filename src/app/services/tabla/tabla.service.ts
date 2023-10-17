import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TablaService {

  private api = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }
  //Agregar un nuevo registro
  agregarRegistro(registro: any) {
    return this.http.post(`${this.api}/patabla`, registro);
  }
 // Obtener todos los registros
  obtenerRegistros() {
    return this.http.get(`${this.api}/gettabla`);
}
 // Obtener un registro por ID
 obtenerRegistroPorId(rpu: string) {
  return this.http.get(`${this.api}/gettabla/${rpu}`);
}

// Actualizar un registro por ID
actualizarRegistro(id: string, registro: any) {
  return this.http.put(`${this.api}/actualizartabla/${id}`, registro);
}

// Eliminar un registro por ID
eliminarRegistro(id: string) {
  return this.http.delete(`${this.api}/eliminartabla/${id}`);
}
}