import { Component } from '@angular/core';
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
  constructor(private tablaService: TablaService) {}

  ngOnInit(): void {
    // No realices la solicitud de inicio de sesión en el constructor
    // Puedes hacerlo en un método cuando se dispare un evento, por ejemplo, en el evento de envío de formulario.
    this.obtenerRegistro();
    this.Ruta = localStorage.getItem('Ruta') || '';
}
  buscarRegistro(rpu: string) {
    this.tablaService.obtenerRegistroPorId(rpu)
    .pipe(
      catchError((error) => {
        // Manejo de errores
        console.error('Error al buscar registro:', error);
        return [];
      })
    )
    .subscribe((data: any) => {
      if (data.ok) {
        this.registroEncontrado = data;
        console.log(this.registroEncontrado);
      }
    });
  }
  obtenerRegistro(){
    this.tablaService.obtenerRegistros().subscribe((response: any) => {
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
