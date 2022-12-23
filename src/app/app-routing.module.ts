import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './fitness/about/about.component';
import { ArticleComponent } from './fitness/Article/article.component';
import { ContactComponent } from './fitness/contact/contact.component';
import { FitnessComponent } from './fitness/fitness.component';
import { HomeComponent } from './fitness/home/home.component';
import { NotfoundComponent } from './Layout/notfound/notfound.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'fitness/:cat/:id',component:FitnessComponent},
  {path:'fitness/:cat/:id/:subCatId',component:FitnessComponent},
  {path:'article/:cat/:id/:artId',component:ArticleComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
