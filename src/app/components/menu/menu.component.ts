import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  // Manejar el estado del menú
  menu: boolean = false;
  constructor(private router: Router){}

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
    this.router.navigate(['/iniciosesion']); // Redirige al usuario a la página de inicio de sesión
  }
}
