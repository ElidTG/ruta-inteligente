import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaRegistroComponent } from './components/tabla-registro/tabla-registro.component';
import { TablaBuscarComponent } from './components/tabla-buscar/tabla-buscar.component';
import { TablaModificarComponent } from './components/tabla-modificar/tabla-modificar.component';
import { TablaExportarComponent } from './components/tabla-exportar/tabla-exportar.component';
import { LogginComponent } from './components/loggin/loggin.component';

const routes: Routes = [
  {
    path: 'registro', component: TablaRegistroComponent,
  },
  {
    path: 'buscar', component: TablaBuscarComponent
  },
  {
    path: 'modificar', component: TablaModificarComponent
  },
  {
    path: 'exportar', component: TablaExportarComponent
  },
  {
    path: 'iniciosesion',component: LogginComponent
  },
  {
    path: '', redirectTo: 'iniciosesion', pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

