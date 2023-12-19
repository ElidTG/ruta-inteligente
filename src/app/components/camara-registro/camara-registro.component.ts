import { Component, ViewChild } from '@angular/core';
import { WebcamComponent} from 'ngx-webcam'; // WebcamImage
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import * as Quagga from 'quagga';


@Component({
  selector: 'app-camara-registro',
  templateUrl: './camara-registro.component.html',
  styleUrls: ['./camara-registro.component.css'],
})
export class CamaraRegistroComponent { 

  @ViewChild('webcam') webcam: WebcamComponent | undefined;
  private trigger: Subject<any> = new Subject();
  webcamImage: any;
  private nextWebcam: Subject<any> = new Subject();

  sysImage = '';
  capturedCode: string = '';

  ngOnInit() {
    // Configurar Quagga
  /**Quagga.init({
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector('#barcode-scanner'),
    },
    decoder: {
      readers: ['code_128_reader', 'ean_reader','ean_8_reader','code_39_reader','code_39_vin_reader','codabar_reader','upc_reader','upc_e_reader'],
    },
  }, function(err: any) {
    if (err) { console.log(err); return }
        // Inicializar Quagga después de configurarlo
    Quagga.initialized = true;
    Quagga.start();
  });**/
  }

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('Imagen tomada', this.sysImage);
    //Verificar si Quagga esta Listo.
    if (Quagga) {
    // Utilizar Quagga para leer el código de barras desde la imagen
    Quagga.decodeSingle(
      {
        src: webcamImage.imageAsDataUrl,
        numOfWorkers: 0, // Desactivar el uso de workers para evitar problemas con Angular
        locate: true,
        inputStream: {
          size: 640,
        },
        decoder: {
          readers: ['code_128_reader', 'ean_reader'], // Configuración de los lectores de códigos de barras
        },
      },
      (result: { codeResult: { code: any } }) => {
        if (result?.codeResult) {
          // Actualizar la variable capturedCode con el código detectado
          this.capturedCode = result.codeResult.code;
          console.log('Código de barras detectado:', this.capturedCode);
          // También puedes enviar el resultado a tu backend mediante un servicio HTTP
        } else {
          console.error('No se pudo leer el código de barras.');
        }
      }
    );
  }else{
    console.error('Quagga no está disponible o no se ha inicializado correctamente.');
  }
  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }
}
