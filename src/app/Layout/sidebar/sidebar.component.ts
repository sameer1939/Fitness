import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'src/app/models/subscriber';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ArticleService } from 'src/app/services/article.service';
import { SubscriberService } from 'src/app/services/subscriber.service';
import { Article } from 'src/app/ViewModels/article';
import { ArticleVM } from 'src/app/ViewModels/articleVM';
import { SubCategory } from 'src/app/ViewModels/subcategory';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() subCategory:SubCategory[];
  @Input() popularTag:SubCategory[];
  @Input() popularArticles:ArticleVM[];
  ImageUrl = environment.ImageUrl;
  obj = new Subscriber();

  constructor(private router:Router,private articleService:ArticleService,
    private subservice:SubscriberService,private alertify:AlertifyService) { }

  ngOnInit(): void {

  }
  showArticleDetail(cat:string,catId:number,subCatId:number){
    this.router.navigate(['article/'+cat+'/'+catId+'/'+subCatId]);
  }
  showArticleDetailByCategory(cat:string,catId:number,subCatId:number){
    this.router.navigate(['fitness/'+cat+'/'+catId+'/'+subCatId]);
  }
  AddSubscribers(Email:any){
    if(Email.value==""){
      this.alertify.warning("Please enter email!");
      return;
    }
    this.obj.email=Email.value;
    this.subservice.addSubscribers(this.obj).subscribe((data)=>{
      this.alertify.success("Thanks for subscribe we will update you on time");
    },error=>{
      this.alertify.error(error.error);
    })
    //console.log(Email.value);
  }

}
