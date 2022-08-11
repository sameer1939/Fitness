import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/menu.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { Article } from 'src/app/ViewModels/article';
import { ArticleVM } from 'src/app/ViewModels/articleVM';
import { SubCategory } from 'src/app/ViewModels/subcategory';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  artId:number;
  article:ArticleVM;
  ImageUrl = environment.ImageUrl;
  subCategories: Array<SubCategory> = [];
  PopularTags: Array<SubCategory> = [];
  languageInHindi:boolean=false;
  constructor(private articleService:ArticleService,private route:ActivatedRoute,
    private categoryService: CategoryService,
    private subCategory: SubcategoryService) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get("artId")){
      this.artId = +this.route.snapshot.params["artId"];
      this.getArticleDetail(this.artId);

      this.categoryService.getSubCatByCategoryId(+this.route.snapshot.params["id"]).subscribe((data:SubCategory[])=>{
        this.subCategories=data;
      })

      this.subCategory.getRandomVisibleSubCategory(10).subscribe((result: SubCategory[]) => {
        this.PopularTags = result
      })
    }
  }

  getArticleDetail(id){
    this.articleService.getArticlesById(id).subscribe((data:ArticleVM)=>{
      this.article = data;
    })
  }

  changeLanguage(el: HTMLElement){
    this.languageInHindi = !this.languageInHindi;
    el.scrollIntoView({ behavior: 'smooth' });
  }

}
