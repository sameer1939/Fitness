import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './fitness/about/about.component';
import { ArticleComponent } from './fitness/Article/article.component';
import { DietComponent } from './fitness/diet/diet.component';
import { ExcerciseComponent } from './fitness/excercise/excercise.component';
import { FitnessComponent } from './fitness/fitness.component';
import { HomeComponent } from './fitness/home/home.component';
import { SteriodComponent } from './fitness/steriod/steriod.component';
import { SupplimentComponent } from './fitness/suppliment/suppliment.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'excercises',component:ExcerciseComponent}, // component not in use
  {path:'diets',component:DietComponent},// component not in use
  {path:'supplements',component:SupplimentComponent},// component not in use
  {path:'steriods',component:SteriodComponent},// component not in use
  {path:'about',component:AboutComponent},// component not in use
  {path:'fitness/:cat/:id',component:FitnessComponent},
  {path:'fitness/:cat/:id/:artId',component:ArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
