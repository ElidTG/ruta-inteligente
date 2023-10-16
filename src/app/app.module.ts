import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TablaRegistroComponent } from './components/tabla-registro/tabla-registro.component';
import { TablaBuscarComponent } from './components/tabla-buscar/tabla-buscar.component';
import { TablaModificarComponent } from './components/tabla-modificar/tabla-modificar.component';
import { TablaExportarComponent } from './components/tabla-exportar/tabla-exportar.component';
import { MenuComponent } from './components/menu/menu.component';
import { LogginComponent } from './components/loggin/loggin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TablaRegistroComponent,
    TablaBuscarComponent,
    TablaModificarComponent,
    TablaExportarComponent,
    MenuComponent,
    LogginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
