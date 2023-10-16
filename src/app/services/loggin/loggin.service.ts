import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogginService {
  private api = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  login(Correo: string, Password: string) {
    const url = `${this.api}/iniciosesion`;
    const body = { Correo, Password };
    return this.http.post(url, body);
  }

  getAllRegistros() {
    return this.http.get(`${this.api}/registros`);
  }
}
