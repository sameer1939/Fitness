import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/ViewModels/article';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css']
})
export class DietComponent implements OnInit {

  articles: Array<Article> = [];
  constructor(private articleService: ArticleService) {

  }

  ngOnInit(): void {

  }

}
