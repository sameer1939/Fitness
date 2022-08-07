import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) { }

  getVisibleArticles(cat:number) {
    return this.http.get(this.baseUrl + "article/bindVisibleArticleFrontend/"+cat);
  }
}
