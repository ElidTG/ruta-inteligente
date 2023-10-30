import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { TablaService } from '../../services/tabla/tabla.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'tabla-modificar',
  templateUrl: 'tabla-modificar.component.html',
  styleUrls: ['tabla-modificar.component.css']
})
export class TablaModificarComponent implements OnInit {
  registroEncontrado = {// Aquí almacenarás el registro a editar
    NumeroM: '',
    CodigoM: '',
    CodigoLote: '',
    Tarifa: '',
    Hilos: '',
    Rpu: '',
    Folio: '',
    KhM: '',
    RrM: '',
    Ruta: '',
  }; 
  registros: any[] = [];
  Ruta = ''
  rpubuscar = ''
  mostrarTabla = false

  constructor(
    private tablaService: TablaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtén el ID del registro a editar desde la ruta
    const id = this.route.snapshot.paramMap.get('id');
    this.Ruta = localStorage.getItem('Ruta') || '';
  }
      // Utiliza el servicio para cargar el registro
  buscarRegistro(rpu: string) {
    this.tablaService.obtenerRegistroPorId(rpu)
    .pipe(
      catchError((error) => {
        // Manejo de errores
        console.error('Error al buscar registro:', error);
        alertaFALSE('Registro NO encotrado')
        return [];
      })
    )
    .subscribe((data: any) => {
      if (data.ok) {
        this.registroEncontrado = data.registro;
        console.log(this.registroEncontrado);

      }
    });
  }
  agregarRegistro() {
    this.tablaService.agregarRegistro(this.registroEncontrado).subscribe((response: any) => {
      if (response.ok) {
        alertaOk('Registro agregado con éxito.');
        // Puedes hacer algo aquí después de agregar el registro, como limpiar el formulario o recargar los datos de la tabla.
      // Limpia los campos del formulario
      this.registroEncontrado = {
        NumeroM: '',
        CodigoM: '',
        CodigoLote: '',
        Tarifa: '',
        Hilos: '',
        Rpu: '',
        Folio: '',
        KhM: '',
        RrM: '',
        Ruta: this.Ruta,
      };
      // Opcional: Recarga los datos de la tabla
      this.obtenerRegistro();
      }
    });
    }
  guardarCambios() {
    // Obtén el ID del registro a editar desde la ruta
    // Utiliza el servicio para guardar los cambios en el registro
    this.tablaService.actualizarRegistro(this.rpubuscar, this.registroEncontrado).subscribe((response: any) => {
      if (response.ok) {
        alertaOk('Registro actualizado con éxito.');
        this.buscarRegistro(this.rpubuscar);
        console.log('URL a la que se hace la solicitud PUT:', `https://ruta-inteligente-logica.onrender.com/actualizartabla/${this.rpubuscar}`);
        this.mostrarTabla = true;
      }else{
        alertaFALSE('Registro No encontrado')
      }
    });
    // Maneja el caso en que id es nulo
  }
  obtenerRegistro(){
    this.tablaService.obtenerRegistros(this.Ruta).subscribe((response: any) => {
      if (response.ok) {
        this.registros = response.registros;
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
  function alertaFALSE (message : string){
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
    timer : 1500
    });
    }
