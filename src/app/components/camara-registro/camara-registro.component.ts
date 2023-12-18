import { Component, ViewChild } from '@angular/core';
import { WebcamComponent} from 'ngx-webcam'; // WebcamImage
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import Quagga from 'quagga'; // ES6
const Quagga = require('quagga').default; // Common JS (important: default)

@Component({
  selector: 'app-camara-registro',
  templateUrl: './camara-registro.component.html',
  styleUrls: ['./camara-registro.component.css'],
})
export class CamaraRegistroComponent { 
  /** @ViewChild('webcam') webcam: WebcamComponent | undefined;
  lastWebcamImage: WebcamImage | undefined;

  tomarFoto() {
    this.webcam?.imageCapture.subscribe(
      (image: WebcamImage) => {
        // Almacenar la última imagen capturada
        this.lastWebcamImage = image;

        // Utilizar Quagga para leer el código de barras desde la imagen
        Quagga.decodeSingle(
          {
            src: image.imageAsDataUrl, // Usar la URL de datos de la imagen
            numOfWorkers: 0, // Desactivar el uso de workers para evitar problemas con Angular
            locate: true,
            inputStream: {
              size: 640,
            },
            decoder: {
              readers: ['code_128_reader'],
            },
          },
          (result: { codeResult: { code: any } }) => {
            if (result?.codeResult) {
              // Aquí puedes procesar el resultado del código de barras
              console.log('Código de barras detectado:', result.codeResult.code);
              // También puedes enviar el resultado a tu backend mediante un servicio HTTP
            } else {
              console.error('No se pudo leer el código de barras.');
            }
          }
        );
      },
      (error: any) => {
        console.error('Error al capturar la imagen:', error);
      }
    );
        // Iniciar la captura de la imagen después de suscribirse al evento
        this.webcam?.takeSnapshot();
  }
  // Resto del código...**/
  private trigger: Subject<any> = new Subject();
  webcamImage: any;
  private nextWebcam: Subject<any> = new Subject();

  sysImage = '';

  ngOnInit() {}

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

}
