import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductChangeComponent } from './admin-product-change.component';

const routes: Routes = [{ path: '', component: AdminProductChangeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProductChangeRoutingModule { }
