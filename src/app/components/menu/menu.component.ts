import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  // Manejar el estado del menú
  menu: boolean = false;

  ngOnInit(): void {
    // Buscar el valor en el localStorage
    const isLoggedIn = localStorage.getItem('loggin') === 'logeado';

    if (isLoggedIn) {
      this.menu = true;
    }
  }

  cerrarSesion() {
    localStorage.removeItem('Ruta');
    localStorage.removeItem('loggin');
    this.menu = false; // Oculta el menú al cerrar la sesión
  }
}
