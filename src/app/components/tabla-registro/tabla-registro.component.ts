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
    Latitud: 0,
    Longitud: 0,
    Timestamp: '',
  };
  // Define previousLat and this.previousLng variables
  previousLat: number | null = null;
  previousLng: number | null = null;

constructor(private tablaService: TablaService) {}

ngOnInit(): void {
    // No realices la solicitud de inicio de sesión en el constructor
    // Puedes hacerlo en un método cuando se dispare un evento, por ejemplo, en el evento de envío de formulario.
    this.obtenerRegistro();
    this.Ruta = localStorage.getItem('Ruta') || '';
    
}


agregarRegistro() {
  if (this.registroForm.form.valid) {
      // Obtener las coordenadas utilizando la API de geolocalización
      if (navigator.geolocation) {
        const options = {
          enableHighAccuracy: true, // Habilita la alta precisión
          timeout: 10000, // Tiempo máximo permitido para obtener la posición (en milisegundos)
          maximumAge: 0 // Descarta la caché y obtiene una nueva posición
        };
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Verificar si las coordenadas son diferentes de las anteriores
          if (position.coords.latitude !== this.previousLat || position.coords.longitude !== this.previousLng) {
            // Almacena las coordenadas en el objeto de registro
            this.registro.Latitud = position.coords.latitude;
            this.registro.Longitud = position.coords.longitude;
           // Actualizar las coordenadas anteriores
           this.previousLat = position.coords.latitude;
           this.previousLng = position.coords.longitude;
            // Agrega una marca de tiempo al registro
          this.registro.Timestamp = new Date().toISOString();

  this.tablaService.agregarRegistro(this.registro).subscribe((response: any) => {
    if (response.ok) {
      alertaOk('Registro agregado con éxito.');
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
      Latitud: 0, 
      Longitud: 0,
      Timestamp: '',
    };
    // Recarga los datos de la tabla
    this.obtenerRegistro();
    }
  });
} else {
  console.log("Las coordenadas son iguales a las anteriores. No se agregará un nuevo registro.");
}
},
    (error) => {
    console.error('Error al obtener la ubicación:', error);
    alertaLlenar('Error al obtener la ubicación. Registro no agregado.');
  },
  options
);
} else {
alertaLlenar('Tu navegador no admite la geolocalización. Registro no agregado.');
}
} else {
  alertaLlenar('Por favor, complete todos los campos.');
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

function alertaLlenar (message : string){
  Swal.fire({
  text: message,
  width : 'auto',
  icon : 'error',
  iconColor : '#090c9b',
  background : 'white',
  padding : '0px 0px 20px 0px',
  color : 'black',
  buttonsStyling : false,
  showConfirmButton : false,
  timer : 1300
  });
  }
