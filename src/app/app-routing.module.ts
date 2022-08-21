import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './fitness/about/about.component';
import { ArticleComponent } from './fitness/Article/article.component';
import { FitnessComponent } from './fitness/fitness.component';
import { HomeComponent } from './fitness/home/home.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'about',component:AboutComponent},// component not in use
  {path:'fitness/:cat/:id',component:FitnessComponent},
  {path:'fitness/:cat/:id/:subCatId',component:FitnessComponent},
  {path:'article/:cat/:id/:artId',component:ArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
