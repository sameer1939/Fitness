import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  baseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) { }

  getVisibleArticles(cat:number,take:number) {
    return this.http.get(this.baseUrl + "article/bindVisibleArticleFrontend/"+cat+"/"+take);
  }
  getVisibleArticlesBySubCategory(subCatId:number,take:number) {
    return this.http.get(this.baseUrl + "article/bindVisibleArticleBySubCategoryId/"+subCatId+"/"+take);
  }

  getArticlesById(id:number) {
    return this.http.get(this.baseUrl + "article/articleById/"+id);
  }

  getMoreArticles(skp:number,take:number) {
    return this.http.get(this.baseUrl + "article/bindMoreVisibleArticleFrontend/"+skp+"/"+take);
  }

  getTopPopularArticles(take:number){
    return this.http.get(this.baseUrl+"article/bindTopPopularArticles/"+take);
  }
  updateViews(id:number){
    return this.http.get(this.baseUrl + "article/updateViews/"+id);
  }
}
