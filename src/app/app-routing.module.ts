import { HeaderComponent } from './products/header/header.component';
import { CreateComponent } from './products/create/create.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './products/store/store.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: '', component: StoreComponent },
      { path: 'create', component: CreateComponent },
      { path: "**", redirectTo: "forbidden" },
      { path: '404', redirectTo: '/404' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppRoutingModule { }
