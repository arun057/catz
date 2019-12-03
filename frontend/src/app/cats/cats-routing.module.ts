import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './all/all.component';
import { RandomComponent } from './random/random.component';

const routes: Routes = [
  { path: '', component: AllComponent },
  { path: 'random', component: RandomComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatsRoutingModule { }
