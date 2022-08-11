import { Component, OnInit } from "@angular/core";
import * as AOS from "aos";
import { ArticleService } from "src/app/services/article.service";
import { CategoryService } from "src/app/services/menu.service";
import { SubcategoryService } from "src/app/services/subcategory.service";
import { Article } from "src/app/ViewModels/article";
import { ArticleVM } from "src/app/ViewModels/articleVM";
import { Category } from "src/app/ViewModels/category";
import { SubCategory } from "src/app/ViewModels/subcategory";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  articles: Array<ArticleVM> = [];
  subCategories: Array<SubCategory> = [];
  PopularTags: Array<SubCategory> = [];
  constructor(private articleService: ArticleService, private menuService: CategoryService,
    private subCategory: SubcategoryService) {
    AOS.init();
  }

  ngOnInit(): void {
    this.articleService.getVisibleArticles(0).subscribe((data: any[]) => {
      console.log(data);
      this.articles = data;
    });

    this.subCategory.getRandomVisibleSubCategory(5).subscribe((result: SubCategory[]) => {
      this.subCategories = result
    })
    
    this.subCategory.getRandomVisibleSubCategory(10).subscribe((result: SubCategory[]) => {
      this.PopularTags = result
    })
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
