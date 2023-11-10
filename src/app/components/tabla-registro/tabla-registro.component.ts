import { Component,ViewChild, ElementRef  } from '@angular/core';
import { TablaService } from '../../services/tabla/tabla.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tabla-registro',
  templateUrl: './tabla-registro.component.html',
  styleUrls: ['./tabla-registro.component.css']
})
export class TablaRegistroComponent {
  @ViewChild('registroForm') registroForm!: NgForm; // Activa el formulario
  registros: any[] = [];
  Ruta = ''
  registro = {
    NumeroM: '',
    CodigoM:'',
    CodigoLote:'',
    Tarifa:'',
    Hilos:'',
    Rpu: '',
    Folio: '',
    KhM:'',
    RrM:'',
    Ruta: localStorage.getItem("Ruta") || '',
  };


constructor(private tablaService: TablaService) {}

ngOnInit(): void {
    // No realices la solicitud de inicio de sesión en el constructor
    // Puedes hacerlo en un método cuando se dispare un evento, por ejemplo, en el evento de envío de formulario.
    this.obtenerRegistro();
    this.Ruta = localStorage.getItem('Ruta') || '';
}

agregarRegistro() {
  if (this.registroForm.form.valid) {
  this.tablaService.agregarRegistro(this.registro).subscribe((response: any) => {
    if (response.ok) {
      alertaOk('Registro agregado con éxito.');
      // Puedes hacer algo aquí después de agregar el registro, como limpiar el formulario o recargar los datos de la tabla.
    // Limpia los campos del formulario
    this.registro = {
      NumeroM: '',
      CodigoM: '',
      CodigoLote: '',
      Tarifa: '',
      Hilos: '',
      Rpu: '',
      Folio: '',
      KhM: '',
      RrM: '',
      Ruta:localStorage.getItem("Ruta") || '',
    };
    // Opcional: Recarga los datos de la tabla
    this.obtenerRegistro();
    }
  });
} else {
  alert('Por favor, complete todos los campos.');
}
}
obtenerRegistro(){
  this.tablaService.obtenerRegistros(localStorage.getItem("Ruta") || '').subscribe((response: any) => {
    if (response.ok) {
      this.registros = response.registros.reverse();
      console.log (this.registros);
      
    }
  });
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
