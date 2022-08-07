import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/ViewModels/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: Array<Article> = [];
  constructor(private articleService: ArticleService) {
    AOS.init();

  }

  ngOnInit(): void {
    this.articleService
          .getVisibleArticles(0)
          .subscribe((data: any[]) => {
            this.articles = data;
          });
  }


}
