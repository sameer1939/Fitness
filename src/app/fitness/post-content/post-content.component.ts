import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/ViewModels/article';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.css']
})
export class PostContentComponent implements OnInit {

  @Input() article: Article;
  ImageUrl = environment.ImageUrl;
  constructor() { }

  ngOnInit(): void {
  }

}
