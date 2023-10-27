// menu.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
//guardar si se ve 
token = localStorage.getItem('loggin');

//manejar el estado del menu
menu = true

ngOnInit(): void {
  //Debe de buscar el valor en el localStorage
  if ((this.token === null || this.token === undefined))
  {
    console.log("Error al iniciar sesion")

  }
  else{
    this.menu = true
  }
}
cerrarSesion(){
  localStorage.removeItem('Ruta');
  localStorage.removeItem('loggin');
}
}
