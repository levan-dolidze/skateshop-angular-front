import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule) },
  { path: 'sale', loadChildren: () => import('./components/sale/sale.module').then(m => m.SaleModule) },
  { path: 'deck', loadChildren: () => import('./components/products/deck/deck.module').then(m => m.DeckModule) },
  { path: 'wheel', loadChildren: () => import('./components/products/wheel/wheel.module').then(m => m.WheelModule) },
  { path: 'contact', loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule) },
  { path: 'truck', loadChildren: () => import('./components/products/truck/truck.module').then(m => m.TruckModule) },
  { path: 'complete', loadChildren: () => import('./components/products/complete/complete.module').then(m => m.CompleteModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
