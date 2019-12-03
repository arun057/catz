import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { CatsRoutingModule } from './cats-routing.module';
import { AllComponent } from './all/all.component';
import { RandomComponent } from './random/random.component';


@NgModule({
  declarations: [AllComponent, RandomComponent],
  imports: [
    CommonModule,
    CatsRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class CatsModule { }
