import { Component, OnInit } from "@angular/core";
import * as AOS from "aos";
import { ArticleService } from "src/app/services/article.service";
import { Article } from "src/app/ViewModels/article";

@Component({
  selector: "app-excercise",
  templateUrl: "./excercise.component.html",
  styleUrls: ["./excercise.component.css"],
})
export class ExcerciseComponent implements OnInit {
  articles: Array<Article> = [];
  constructor(private articleService: ArticleService) {
    AOS.init();
  }

  ngOnInit(): void {

  }
}
