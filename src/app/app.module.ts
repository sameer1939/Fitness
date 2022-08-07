import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Layout/header/header.component';
import { HomeComponent } from './fitness/home/home.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { ExcerciseComponent } from './fitness/excercise/excercise.component';
import { DietComponent } from './fitness/diet/diet.component';
import { SupplimentComponent } from './fitness/suppliment/suppliment.component';
import { SteriodComponent } from './fitness/steriod/steriod.component';
import { AboutComponent } from './fitness/about/about.component';
import { SidebarComponent } from './Layout/sidebar/sidebar.component';
import { PostContentComponent } from './fitness/post-content/post-content.component';
import { FitnessComponent } from './fitness/fitness.component';
import { CategoryService } from './services/menu.service';
import { ArticleService } from './services/article.service';
import { ArticleComponent } from './fitness/Article/article.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ExcerciseComponent,
    DietComponent,
    SupplimentComponent,
    SteriodComponent,
    AboutComponent,
    SidebarComponent,
    PostContentComponent,
    FitnessComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CategoryService,ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
