import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ReplyDialogComponent } from "src/app/dialogBox/reply-dialog/reply-dialog.component";
import { Comments } from "src/app/models/comments";
import { StoriesVM } from "src/app/models/stories";
import { AlertifyService } from "src/app/services/alertify.service";
import { ArticleService } from "src/app/services/article.service";
import { CommentService } from "src/app/services/comment.service";
import { CategoryService } from "src/app/services/menu.service";
import { StoryService } from "src/app/services/Story.service";
import { SubcategoryService } from "src/app/services/subcategory.service";
import { ArticleVM } from "src/app/ViewModels/articleVM";
import { SubCategory } from "src/app/ViewModels/subcategory";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"],
})
export class ArticleComponent implements OnInit {
  artId: number;
  article: ArticleVM;
  catName:"";
  ImageUrl = environment.ImageUrl;
  subCategories: Array<SubCategory> = [];
  PopularTags: Array<SubCategory> = [];
  popularArt: Array<ArticleVM> = [];
  comments: Array<Comments> = [];
  stories: Array<StoriesVM> = [];
  languageInHindi: boolean = false;

  subCategorieSub: Subscription;
  PopularTagSub: Subscription;
  popularArtSub: Subscription;
  articleSub: Subscription;
  commentSub: Subscription;
  storySub: Subscription;

  artComment = new Comments();

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private subCategory: SubcategoryService,
    public sanitizer: DomSanitizer,
    private commentService: CommentService,
    private alertify: AlertifyService,
    private router:Router,
    private dialog: MatDialog,
    private storyService: StoryService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((val) => {
      if (this.route.snapshot.paramMap.get("artId")) {
        this.artId = +this.route.snapshot.params["artId"];
        this.catName = this.route.snapshot.params["cat"];

        this.storySub = this.storyService.bindVisibleStory().subscribe((result: StoriesVM[]) => {
          this.stories = result
        })

        //alert(this.artId);
        this.getArticleDetail(this.artId);

        // get comments
        this.bindArticleComments();

        this.subCategorieSub = this.categoryService
          .getSubCatByCategoryId(+this.route.snapshot.params["id"])
          .subscribe((data: SubCategory[]) => {
            this.subCategories = data;
          });

        this.PopularTagSub = this.subCategory
          .getRandomVisibleSubCategory(10)
          .subscribe((result: SubCategory[]) => {
            this.PopularTags = result;
          });
        this.popularArtSub = this.articleService
          .getTopPopularArticles(5)
          .subscribe((data: any[]) => {
            this.popularArt = data;
          });

        this.articleService.updateViews(this.artId).subscribe(() => {
          console.log("updated");
        });
      }
    });
  }

  getArticleDetail(id) {
    this.articleSub = this.articleService
      .getArticlesById(id)
      .subscribe((data: ArticleVM) => {
        this.article = data;
      });
  }

  changeLanguage(el: HTMLElement) {
    this.languageInHindi = !this.languageInHindi;
    el.scrollIntoView({ behavior: "smooth" });
  }

  ngOnDestroy(): void {
    this.subCategorieSub.unsubscribe();
    this.PopularTagSub.unsubscribe();
    this.popularArtSub.unsubscribe();
    this.articleSub.unsubscribe();
  }

  bindArticleComments(){
    this.commentSub = this.commentService
          .getAllCommentsByArticle(this.artId)
          .subscribe((data: Comments[]) => {
            //this.comments = data;
            debugger;
            this.comments=[];
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              if (data[index].parentId == 0) {
                this.comments.push({
                  id: data[index].id,
                  name: data[index].name,
                  message: data[index].message,
                  email: data[index].email,
                  parentId: data[index].parentId,
                  articleId: data[index].articleId,
                  insertedDate: data[index].insertedDate,
                  childComments: data.filter(
                    (x) => x.parentId == data[index].id
                  ),
                });
                //this.comments.push(data[index]);
                //this.comments.childComments = data.filter(x=>x.parentId==data[index].id);
              }
            }
          });
  }

  addComments(comment:NgForm){
    this.artComment.name=comment.control.get('name').value;
    this.artComment.email=comment.control.get('email').value;
    this.artComment.message=comment.control.get('message').value;
    this.artComment.parentId=0;
    this.artComment.articleId=this.artId;

    this.commentService.addComments(this.artComment).subscribe(data => {
      this.alertify.success("Comment Added Successfully");
      comment.reset();
      this.bindArticleComments();
    })
  }

  OpenReplyPopup(cmtId:Number,cmt:string,name:string){
    const dialogRef = this.dialog.open(ReplyDialogComponent, {
      height: 'auto',
      width: '100%',
      data: {
        replyTo:name,
        comment: cmt,
        id:cmtId,
        artId:this.artId
      }
    });

    dialogRef.afterClosed().subscribe(result=>{
      this.bindArticleComments();
    })
  }
}
