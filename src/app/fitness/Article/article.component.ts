import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/menu.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ArticleVM } from 'src/app/ViewModels/articleVM';
import { SubCategory } from 'src/app/ViewModels/subcategory';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit, OnDestroy {

  artId: number;
  article: ArticleVM;
  ImageUrl = environment.ImageUrl;
  subCategories: Array<SubCategory> = [];
  PopularTags: Array<SubCategory> = [];
  popularArt: Array<ArticleVM> = [];
  languageInHindi: boolean = false;

  subCategorieSub: Subscription;
  PopularTagSub: Subscription;
  popularArtSub: Subscription;


  constructor(private articleService: ArticleService, private route: ActivatedRoute,
    private categoryService: CategoryService,
    private subCategory: SubcategoryService,public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
   
    this.route.url.subscribe((val) => {

      if (this.route.snapshot.paramMap.get("artId")) {
        
        this.artId = +this.route.snapshot.params["artId"];
        this.getArticleDetail(this.artId);

        this.articleService.updateViews(this.artId).subscribe(() => {
          console.log('updated');
        })

        this.subCategorieSub = this.categoryService.getSubCatByCategoryId(+this.route.snapshot.params["id"]).subscribe((data: SubCategory[]) => {
          this.subCategories = data;
        })

        this.PopularTagSub = this.subCategory.getRandomVisibleSubCategory(10).subscribe((result: SubCategory[]) => {
          this.PopularTags = result
        })
        this.popularArtSub = this.articleService
          .getTopPopularArticles(5)
          .subscribe((data: any[]) => {
            this.popularArt = data;
          });
      }
    });
  }

  getArticleDetail(id) {
    this.articleService.getArticlesById(id).subscribe((data: ArticleVM) => {
      this.article = data;
    })
  }

  changeLanguage(el: HTMLElement) {
    this.languageInHindi = !this.languageInHindi;
    el.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.subCategorieSub.unsubscribe();
    this.PopularTagSub.unsubscribe();
    this.popularArtSub.unsubscribe();
  }

}
