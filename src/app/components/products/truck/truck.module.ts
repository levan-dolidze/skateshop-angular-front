import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruckRoutingModule } from './truck-routing.module';
import { TruckComponent } from './truck.component';


@NgModule({
  declarations: [
    TruckComponent
  ],
  imports: [
    CommonModule,
    TruckRoutingModule
  ]
})
export class TruckModule { }
