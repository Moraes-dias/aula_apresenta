import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CarrosListComponent } from './components/carros/carros-list/carros-list.component';
import { CarrosDetailsComponent } from './components/carros/carros-details/carros-details.component';
import { MarcasListComponent } from './components/marcas/marcas-list/marcas-list.component';
import { MarcasDetailsComponent } from './components/marcas/marcas-details/marcas-details.component';

export const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {
    path:'admin',
    component: PrincipalComponent,
    children: [
      {path: 'carros', component: CarrosListComponent},
      {path: 'carros/new', component: CarrosDetailsComponent},
      {path: 'carros/edit/:id', component: CarrosDetailsComponent},
      {path: 'marcas', component: MarcasListComponent},
      {path: 'marcas/new', component: MarcasDetailsComponent},
      {path: 'marcas/edit/:id', component: MarcasDetailsComponent},
    ]
  }

];
