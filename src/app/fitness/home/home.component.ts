import { Component, OnDestroy, OnInit } from "@angular/core";
import * as AOS from "aos";
import { Subscription } from "rxjs";
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
export class HomeComponent implements OnInit, OnDestroy {
  articles: Array<ArticleVM> = [];
  subCategories: Array<SubCategory> = [];
  PopularTags: Array<SubCategory> = [];
  popularArt: Array<ArticleVM> = [];

  articleSub: Subscription;
  subCategorieSub: Subscription;
  PopularTagSub: Subscription;
  popularArtSub: Subscription;

  constructor(private articleService: ArticleService, private menuService: CategoryService,
    private subCategory: SubcategoryService) {
    AOS.init();
  }

  ngOnInit(): void {
    this.articleSub = this.articleService.getVisibleArticles(0, 5).subscribe((data: any[]) => {
      console.log(data);
      this.articles = data;
    });

    this.subCategorieSub = this.subCategory.getRandomVisibleSubCategory(5).subscribe((result: SubCategory[]) => {
      this.subCategories = result
    })

    this.PopularTagSub = this.subCategory.getRandomVisibleSubCategory(10).subscribe((result: SubCategory[]) => {
      this.PopularTags = result
    });
    this.popularArtSub = this.articleService
      .getTopPopularArticles(5)
      .subscribe((data: any[]) => {
        this.popularArt = data;
      });
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  LoadMoreArticles() {
    this.articleService.getMoreArticles(this.articles.length, 5).subscribe((data: ArticleVM[]) => {
      if (data.length > 0)
        this.articles = [...this.articles, ...data];//  merge array with existing to new array
      else
        alert('No Further records found');
    });
  }
  ngOnDestroy(): void {
    this.articleSub.unsubscribe();
    this.subCategorieSub.unsubscribe();
    this.PopularTagSub.unsubscribe();
    this.popularArtSub.unsubscribe();
  }
}
