import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ArticleService } from "../services/article.service";
import { Article } from "../ViewModels/article";
import * as AOS from "aos";
import { ActivatedRoute } from "@angular/router";
import { SubCategory } from "../ViewModels/subcategory";
import { CategoryService } from "../services/menu.service";
import { SubcategoryService } from "../services/subcategory.service";
import { ArticleVM } from "../ViewModels/articleVM";
import { Category } from "../ViewModels/category";
import { environment } from "src/environments/environment";
import { Subscription } from "rxjs";

@Component({
  selector: "app-fitness",
  templateUrl: "./fitness.component.html",
  styleUrls: ["./fitness.component.css"],
})
export class FitnessComponent implements OnInit {
  articles: Array<ArticleVM> = [];
  subCategories: Array<SubCategory> = [];
  PopularTags: Array<SubCategory> = [];
  category: Category;
  mainId: number;
  ImageUrl = environment.ImageUrl;
  subscriptions: Subscription[];
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private subCategory: SubcategoryService
  ) {
    AOS.init();

  }

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      if (this.route.snapshot.paramMap.get("id")) {
        this.mainId = +this.route.snapshot.params["id"];
        this.articleService
          .getVisibleArticles(this.mainId)
          .subscribe((data: any[]) => {
            this.articles = data;
          });

        this.categoryService.getSubCatByCategoryId(this.mainId).subscribe((data: SubCategory[]) => {
          this.subCategories = data;
        })

        this.subCategory.getRandomVisibleSubCategory(10).subscribe((result: SubCategory[]) => {
          this.PopularTags = result
        })

        this.categoryService.getCategorybyId(this.mainId).subscribe((data: Category) => {
          this.category = data;
        });
      }


    });
  }


}
