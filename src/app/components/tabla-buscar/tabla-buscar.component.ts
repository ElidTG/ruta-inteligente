import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { TablaService } from 'src/app/services/tabla/tabla.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tabla-buscar',
  templateUrl: './tabla-buscar.component.html',
  styleUrls: ['./tabla-buscar.component.css']
})
export class TablaBuscarComponent {
  registroEncontrado: any = null; 
  registros: any[] = [];
  Ruta = ''
  criterio: string = '';
  buscarTipo: string = 'rpu'; // Default search type
  constructor(private tablaService: TablaService) {}

  ngOnInit(): void {
    // No realices la solicitud de inicio de sesión en el constructor
    // Puedes hacerlo en un método cuando se dispare un evento, por ejemplo, en el evento de envío de formulario.
    this.obtenerRegistro();
    this.Ruta = localStorage.getItem('Ruta') || '';
}
  /* buscarRegistro(rpu: string) {
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
  }*/
  buscarRegistro() {
    if (this.criterio.trim() !== '') {
      this.tablaService.buscarRegistro(this.criterio, this.buscarTipo).subscribe(
        (data: any) => {
          if (data.ok) {
            this.registroEncontrado = data.registro;
            console.log(this.registroEncontrado);
          } else {
            console.log('Registro no encontrado');
            alertaFALSE('Registro no encontrado');
            this.registroEncontrado = null; // Reset the found record
          }
        },
        (error) => {
          console.error('Error al buscar registro:', error);
          alertaFALSE('Error al buscar registro. Por favor, inténtelo de nuevo más tarde.');
        }
      );
    } else {
      alertaFALSE('Por favor, introduzca un criterio de búsqueda válido.');
    }
  }
  /*buscarRegistro(criterio: string, buscarTipo: string) {
    let searchObservable: Observable<any> | undefined;
    if (buscarTipo === 'rpu') {
        searchObservable = this.tablaService.obtenerRegistroPorId(criterio);
    } else if (buscarTipo === 'numeroM') {
        searchObservable = this.tablaService.obtenerRegistroPorNumeroM(criterio);
    }

    if (searchObservable) {
        searchObservable.pipe(
            catchError((error) => {
                // Error handling
                console.error('Error al buscar registro:', error);
                alertaFALSE('Registro NO encontrado');
                return [];
            })
        ).subscribe((data: any) => {
            if (data.ok) {
                this.registroEncontrado = data.registro;
                console.log(this.registroEncontrado);
            }
        });
    }
}*/

  obtenerRegistro(){
    this.tablaService.obtenerRegistros(localStorage.getItem("Ruta") || '').subscribe((response: any) => {
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
