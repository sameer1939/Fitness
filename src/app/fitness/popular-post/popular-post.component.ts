import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/ViewModels/article';
import { ArticleVM } from 'src/app/ViewModels/articleVM';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-popular-post',
  templateUrl: './popular-post.component.html',
  styleUrls: ['./popular-post.component.css']
})
export class PopularPostComponent implements OnInit {

  @Input() popularArticle:ArticleVM;
  ImageUrl = environment.ImageUrl;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  showArticleDetail(cat:string,catId:number,artId:number){
    this.router.navigate(['fitness/'+cat+'/'+catId+'/'+artId]);
  }

}
