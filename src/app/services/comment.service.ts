import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Comments } from "../models/comments";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  baseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) {}

  getAllCommentsByArticle(artId: number) {
    return this.http.get(this.baseUrl + "comments/commentByArticleId/" + artId);
  }

  addComments(comment:Comments){
    return this.http.post(this.baseUrl+"comments/add",comment);
  }
}
