import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './fitness/about/about.component';
import { DietComponent } from './fitness/diet/diet.component';
import { ExcerciseComponent } from './fitness/excercise/excercise.component';
import { HomeComponent } from './fitness/home/home.component';
import { SteriodComponent } from './fitness/steriod/steriod.component';
import { SupplimentComponent } from './fitness/suppliment/suppliment.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'excercises',component:ExcerciseComponent},
  {path:'diets',component:DietComponent},
  {path:'suppliments',component:SupplimentComponent},
  {path:'steriods',component:SteriodComponent},
  {path:'about',component:AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
