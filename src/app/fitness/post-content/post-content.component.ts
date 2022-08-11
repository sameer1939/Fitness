import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/ViewModels/article';
import { ArticleVM } from 'src/app/ViewModels/articleVM';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.css']
})
export class PostContentComponent implements OnInit {

  @Input() article: ArticleVM;
  ImageUrl = environment.ImageUrl;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  showArticleDetail(cat:string,catId:number,artId:number){
    this.router.navigate(['fitness/'+cat+'/'+catId+'/'+artId]);
  }
}
