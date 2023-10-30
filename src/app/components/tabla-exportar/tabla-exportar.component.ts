import { Component } from '@angular/core';
import { TablaService } from '../../services/tabla/tabla.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-tabla-exportar',
  templateUrl: './tabla-exportar.component.html',
  styleUrls: ['./tabla-exportar.component.css']
})
export class TablaExportarComponent {
  registroEncontrado: any = null; 
  registros: any[] = [];
  Ruta = localStorage.getItem("Ruta") || '';

  constructor(private tablaService: TablaService) {}
  ngOnInit(): void {
    // No realices la solicitud de inicio de sesión en el constructor
    // Puedes hacerlo en un método cuando se dispare un evento, por ejemplo, en el evento de envío de formulario.
    this.obtenerRegistro();
  }
  obtenerRegistro() {
    this.tablaService.obtenerRegistros(this.Ruta).subscribe((response: any) => {
      if (response.ok) {
        this.registros = response.registros;
        console.log (this.registros);
      }
    });
}

  /**
   Nombre default para cada archivo
   */
  filename = "ExcelSheet.xlsx";

  exportExcel(){
/** Passing table id*/

let data = document.getElementById("table-data");
const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

/** Generar nuevo worrkboock y añadir el worksheet */
const wb:XLSX.WorkBook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

/**Save file */
XLSX.writeFile(wb,this.filename)
  }
}
