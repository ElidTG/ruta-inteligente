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
    
}

login() {
    // Llama a este método cuando se envía el formulario
    this.servicio.login(this.usuario.Correo, this.usuario.Password).subscribe(
        (data: any) => {
          alertaOk('Inicio exitoso');
            // respuesta del servidor
            console.log('Respuesta del servidor:', data);
            localStorage.setItem("Ruta", data.Ruta);
            localStorage.setItem('loggin', 'logeado');
            Swal.fire('Inicio de sesión', 'Inicio de sesión exitoso', 'success');
            // Realiza otras acciones según la respuesta
            setTimeout(() => {
              this.router.navigate(['/registro']).then(() => {
                window.location.reload();
              });
            }, 1500);
        },
        (error: any) => {
            // Manejar errores
            console.error('Error:', error);
            Swal.fire('Error', 'Error al iniciar sesión', 'error');
        }
    );
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

