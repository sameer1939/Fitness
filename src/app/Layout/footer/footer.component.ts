import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Subscriber } from 'src/app/models/subscriber';
import { ArticleService } from 'src/app/services/article.service';
import { SubscriberService } from 'src/app/services/subscriber.service';
import { ArticleVM } from 'src/app/ViewModels/articleVM';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit,OnDestroy {

  obj = new Subscriber();
  popularArticles:ArticleVM[];
  topArticle:ArticleVM[];
  randomArticle:ArticleVM[];
  ImageUrl = environment.ImageUrl;
  popularArtSub: Subscription;
  topArtSub: Subscription;
  randomArtSub: Subscription;
  constructor(private subservice:SubscriberService,private articleService: ArticleService,
    private router:Router) { }


  ngOnInit(): void {
    this.popularArtSub = this.articleService
          .getTopPopularArticles(3)
          .subscribe((data: ArticleVM[]) => {
            this.popularArticles = data;
          });

    this.topArtSub = this.articleService
          .getTopPopularArticles(1)
          .subscribe((data: ArticleVM[]) => {
            this.topArticle = data;
          });
          this.randomArtSub = this.articleService
          .getRandomArticles(3)
          .subscribe((data: ArticleVM[]) => {
            this.randomArticle = data;
          });
  }

  AddSubscribers(Email:any){
    if(Email.value==""){
      alert('please enter email');
      return;
    }
    this.obj.email=Email.value;
    this.subservice.addSubscribers(this.obj).subscribe((data)=>{
      alert("Success");
    },error=>{
      alert(error.error);
    })
    console.log(Email.value);
  }

  showArticleDetail(cat:string,catId:number,subCatId:number){
    this.router.navigate(['article/'+cat+'/'+catId+'/'+subCatId]);
  }
  ngOnDestroy(): void {
    this.popularArtSub.unsubscribe();
    this.randomArtSub.unsubscribe();
    this.topArtSub.unsubscribe();
  }
}
