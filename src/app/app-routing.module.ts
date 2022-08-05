import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardGuard } from './guard/admin-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'sale', loadChildren: () => import('./components/sale/sale.module').then(m => m.SaleModule) },
  { path: 'deck', loadChildren: () => import('./components/products/deck/deck.module').then(m => m.DeckModule) },
  { path: 'wheel', loadChildren: () => import('./components/products/wheel/wheel.module').then(m => m.WheelModule) },
  { path: 'truck', loadChildren: () => import('./components/products/truck/truck.module').then(m => m.TruckModule) },
  { path: 'complete', loadChildren: () => import('./components/products/complete/complete.module').then(m => m.CompleteModule) },
  { path: 'gallery', loadChildren: () => import('./components/gallery/gallery.module').then(m => m.GalleryModule) },
  { path: 'view-details/:id', loadChildren: () => import('./components/view-details/view-details.module').then(m => m.ViewDetailsModule) },
  { path: 'product-cart', loadChildren: () => import('./components/product-cart/product-cart.module').then(m => m.ProductCartModule) },
  {
    path: 'admin',

    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuardGuard]

  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
