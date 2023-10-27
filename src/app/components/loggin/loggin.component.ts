import { Component, OnInit } from '@angular/core';

import { LogginService } from '../../services/loggin/loggin.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent implements OnInit {
  usuario = {
    Correo: '',
    Password: '',
}

constructor(private servicio: LogginService, private router: Router) {}

ngOnInit(): void {
    // No realices la solicitud de inicio de sesión en el constructor
    // Puedes hacerlo en un método cuando se dispare un evento, por ejemplo, en el evento de envío de formulario.
    this.verificarSesion();
  }

login() {
    // Llama a este método cuando se envíe el formulario
    this.servicio.login(this.usuario.Correo, this.usuario.Password).subscribe(
        (data: any) => {
          if (data.token) {
            // Guarda el token en el localStorage
            localStorage.setItem('token', data.token);
          alertaOk('Inicio exitoso');
            // Aquí puedes manejar la respuesta del servidor
            console.log('Respuesta del servidor:', data);
            localStorage.setItem("Ruta", data.Ruta);
            Swal.fire('Inicio de sesión', 'Inicio de sesión exitoso', 'success');
            // Redirige o realiza otras acciones según la respuesta
            setTimeout(() => {
              this.router.navigate(['/registro']).then(() => {
                window.location.reload();
              });
            }, 1500);
          } else {
            // Manejar errores, por ejemplo, si no se recibió un token del backend
            console.error('Error: No se recibió un token del servidor');
            Swal.fire('Error', 'Error al iniciar sesión', 'error');
        }
        },
        (error: any) => {
            // Manejar errores aquí
            console.error('Error:', error);
            Swal.fire('Error', 'Error al iniciar sesión', 'error');
        }
    );

}

verificarSesion() {
  const token = localStorage.getItem('token'); // Reemplaza 'token' con el nombre de tu token
  if (token) {
    // El usuario está autenticado, puedes mostrar el icono de cerrar sesión
    // y permitir el acceso al menú
    // ...
  } else {
    // El usuario no está autenticado, muestra el icono de inicio de sesión
    // y no permite el acceso al menú
    // ...
  }
}

iniciarSesion() {
  // Redirige a la página de inicio de sesión o muestra el formulario de inicio de sesión
  // ...
}

cerrarSesion() {
  // Realiza la acción para cerrar sesión, como eliminar el token del localStorage
  localStorage.removeItem('token');
  // Redirige a la página de inicio o realiza otras acciones necesarias
  // ...
}
}

function alertaOk (message : string){
Swal.fire({
text: message,
width : 'auto',
icon : 'success',
iconColor : '#090c9b',
background : 'white',
padding : '0px 0px 20px 0px',
color : 'black',
buttonsStyling : false,
showConfirmButton : false,
timer : 1500
});
}

