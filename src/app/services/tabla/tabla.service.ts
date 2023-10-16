import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TablaService {

  private api = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }
  agregarRegistro(registro: any) {
    return this.http.post(`${this.api}/patabla`, registro);
  }

  obtenerRegistros() {
    return this.http.get(`${this.api}/gettabla`);
}
}