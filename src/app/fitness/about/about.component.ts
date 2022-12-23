import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoriesVM } from 'src/app/models/stories';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/menu.service';
import { StoryService } from 'src/app/services/Story.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ArticleVM } from 'src/app/ViewModels/articleVM';
import { SubCategory } from 'src/app/ViewModels/subcategory';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  slideIndex = 1;
  thatisAll=false;
  articles: Array<ArticleVM> = [];
  ImageUrl = environment.ImageUrl;
  subCategories: Array<SubCategory> = [];
  PopularTags: Array<SubCategory> = [];
  popularArt: Array<ArticleVM> = [];
  stories: Array<StoriesVM> = [];

  articleSub: Subscription;
  subCategorieSub: Subscription;
  PopularTagSub: Subscription;
  popularArtSub: Subscription;
  storySub: Subscription;

  constructor(private articleService: ArticleService, private menuService: CategoryService,
    private subCategory: SubcategoryService, private storyService: StoryService, private dialog: MatDialog,
    private router:Router) {
    //AOS.init();
  }

  ngOnInit(): void {
    this.articleSub = this.articleService.getVisibleBasicsArticles(6).subscribe((data: any[]) => {
      console.log(data);
      this.articles = data;
    });

    this.subCategorieSub = this.subCategory.getRandomVisibleSubCategory(5).subscribe((result: SubCategory[]) => {
      this.subCategories = result
    })

    this.storySub = this.storyService.bindVisibleStory().subscribe((result: StoriesVM[]) => {
      this.stories = result
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

  ngOnDestroy(): void {
    this.articleSub.unsubscribe();
    this.subCategorieSub.unsubscribe();
    this.PopularTagSub.unsubscribe();
    this.popularArtSub.unsubscribe();
    this.storySub.unsubscribe();
  }

}
