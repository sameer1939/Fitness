import { Component, Input, OnInit } from "@angular/core";
import { ArticleService } from "../services/article.service";
import { Article } from "../ViewModels/article";
import * as AOS from "aos";
import { ActivatedRoute } from "@angular/router";
import { SubCategory } from "../ViewModels/subcategory";
import { CategoryService } from "../services/menu.service";

@Component({
  selector: "app-fitness",
  templateUrl: "./fitness.component.html",
  styleUrls: ["./fitness.component.css"],
})
export class FitnessComponent implements OnInit {
  articles: Array<Article> = [];
  subCategories: Array<SubCategory> = [];
  mainId: number;
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    AOS.init();
    this.route.params.subscribe((val) => {
      if (this.route.snapshot.paramMap.get("id")) {
        this.mainId = +this.route.snapshot.params["id"];
        this.articleService
          .getVisibleArticles(this.mainId)
          .subscribe((data: any[]) => {
            this.articles = data;
          });

          this.categoryService.getSubCatByCategoryId(this.mainId).subscribe((data:SubCategory[])=>{
            this.subCategories=data;
          })
      }


    });
  }

  ngOnInit(): void {}
}
