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
export class FitnessComponent implements OnInit, OnDestroy {
  articles: Array<ArticleVM> = [];
  popularArt: Array<ArticleVM> = [];
  subCategories: Array<SubCategory> = [];
  PopularTags: Array<SubCategory> = [];
  category: Category;
  mainId: number;
  subCatId:number;
  ImageUrl = environment.ImageUrl;
  articleSubs: Subscription;
  subCategoriesSub: Subscription;
  popularTagSub: Subscription;
  popularArtSub: Subscription;
  categorySub: Subscription;
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private subCategory: SubcategoryService
  ) {
    AOS.init();

  }

  ngOnInit(): void {
    this.route.url.subscribe((val) => {
      if (this.route.snapshot.paramMap.get("id") || this.route.snapshot.paramMap.get("subCatId")) {
        this.mainId = +this.route.snapshot.params["id"];
        if(this.route.snapshot.paramMap.get("subCatId")){
          this.subCatId = +this.route.snapshot.params["subCatId"];
          this.articleSubs = this.articleService
          .getVisibleArticlesBySubCategory(this.subCatId,5)
          .subscribe((data: any[]) => {
            this.articles = data;
          });
        }
        else{
          this.articleSubs = this.articleService
          .getVisibleArticles(this.mainId,5)
          .subscribe((data: any[]) => {
            this.articles = data;
          });
        }
        

        this.subCategoriesSub = this.categoryService.getSubCatByCategoryId(this.mainId).subscribe((data: SubCategory[]) => {
          this.subCategories = data;
        })

        this.popularTagSub = this.subCategory.getRandomVisibleSubCategory(10).subscribe((result: SubCategory[]) => {
          this.PopularTags = result
        })

        this.categorySub = this.categoryService.getCategorybyId(this.mainId).subscribe((data: Category) => {
          this.category = data;
        });

        this.popularArtSub = this.articleService
          .getTopPopularArticles(5)
          .subscribe((data: any[]) => {
            this.popularArt = data;
          });
      }
    });
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
    this.articleSubs.unsubscribe();
    this.subCategoriesSub.unsubscribe();
    this.popularTagSub.unsubscribe();
    this.popularArtSub.unsubscribe();
    this.categorySub.unsubscribe();
  }
}
