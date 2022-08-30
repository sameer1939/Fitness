import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import * as AOS from "aos";
import { OwlOptions } from "ngx-owl-carousel-o";
import { Subscription } from "rxjs";
import { StoryDialogComponent } from "src/app/dialogBox/story-dialog/story-dialog.component";
import { StoriesVM } from "src/app/models/stories";
import { ArticleService } from "src/app/services/article.service";
import { CategoryService } from "src/app/services/menu.service";
import { StoryService } from "src/app/services/Story.service";
import { SubcategoryService } from "src/app/services/subcategory.service";
import { ArticleVM } from "src/app/ViewModels/articleVM";
import { SubCategory } from "src/app/ViewModels/subcategory";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  slideIndex = 1;
  articles: Array<ArticleVM> = [];
  ImageUrl = environment.ImageUrl;
  subCategories: Array<SubCategory> = [];
  PopularTags: Array<SubCategory> = [];
  popularArt: Array<ArticleVM> = [];
  stories: Array<StoriesVM> = [];

  articleSub: Subscription;
  //subCategorieSub: Subscription;
  //PopularTagSub: Subscription;
  //popularArtSub: Subscription;
  storySub: Subscription;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 700,
    navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      940: {
        items: 3
      }
    },
    nav: false
  }

  constructor(private articleService: ArticleService, private menuService: CategoryService,
    private subCategory: SubcategoryService, private storyService: StoryService, private dialog: MatDialog) {
    //AOS.init();
  }

  ngOnInit(): void {
    this.showDivs(this.slideIndex);
    setInterval(() => {
      this.showDivs(this.slideIndex++);
    }, 6000);
    // this.articleSub = this.articleService.getVisibleArticles(0, 6).subscribe((data: any[]) => {
    //   console.log(data);
    //   this.articles = data;
    // });

    this.articleSub = this.articleService.getVisibleBasicsArticles(6).subscribe((data: any[]) => {
      console.log(data);
      this.articles = data;
    });

    // this.subCategorieSub = this.subCategory.getRandomVisibleSubCategory(5).subscribe((result: SubCategory[]) => {
    //   this.subCategories = result
    // })

    this.storySub = this.storyService.bindVisibleStory().subscribe((result: StoriesVM[]) => {
      this.stories = result
    })

    // this.PopularTagSub = this.subCategory.getRandomVisibleSubCategory(10).subscribe((result: SubCategory[]) => {
    //   this.PopularTags = result
    // });
    // this.popularArtSub = this.articleService
    //   .getTopPopularArticles(5)
    //   .subscribe((data: any[]) => {
    //     this.popularArt = data;
    //   });
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  // LoadMoreArticles() {
  //   this.articleService.getMoreArticles(this.articles.length, 5).subscribe((data: ArticleVM[]) => {
  //     if (data.length > 0)
  //       this.articles = [...this.articles, ...data];//  merge array with existing to new array
  //     else
  //       alert('No Further records found');
  //   });
  // }
  ngOnDestroy(): void {
    this.articleSub.unsubscribe();
    //this.subCategorieSub.unsubscribe();
    //this.PopularTagSub.unsubscribe();
    //this.popularArtSub.unsubscribe();
    this.storySub.unsubscribe();
  }


  plusDivs(n) {
    this.showDivs(this.slideIndex += n);
  }

  showDivs(n) {

    var i;
    var x = document.getElementsByClassName("mySlides") as any;
    if (n >= x.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[this.slideIndex - 1].style.display = "block";
  }

  // dialog box
  openDialog(url,title) {
    const dialogRef = this.dialog.open(StoryDialogComponent, {
      height: '80vh',
      width: '100vh',
      data: {
        videoTitle: title,
        videoUrl:url
      }
    });
  }
}
