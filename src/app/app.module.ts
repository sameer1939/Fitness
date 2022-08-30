import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Layout/header/header.component';
import { HomeComponent } from './fitness/home/home.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { AboutComponent } from './fitness/about/about.component';
import { SidebarComponent } from './Layout/sidebar/sidebar.component';
import { PostContentComponent } from './fitness/post-content/post-content.component';
import { FitnessComponent } from './fitness/fitness.component';
import { CategoryService } from './services/menu.service';
import { ArticleService } from './services/article.service';
import { ArticleComponent } from './fitness/Article/article.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './services/loader.interceptor';
import { PopularPostComponent } from './fitness/popular-post/popular-post.component';
import { SafeHTMLPipe } from './pipes/safeHTML.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoryService } from './services/Story.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { StoryDialogComponent } from './dialogBox/story-dialog/story-dialog.component'
import {MatButtonModule} from '@angular/material/button';
import { NotfoundComponent } from './Layout/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    SidebarComponent,
    PostContentComponent,
    FitnessComponent,
    ArticleComponent,
    LoaderComponent,
    PopularPostComponent,
    SafeHTMLPipe,
    StoryDialogComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    CarouselModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [CategoryService, ArticleService,StoryService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
