import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = environment.BaseUrl;

  constructor(private http: HttpClient) { }

  bindVisibleCategory(){
    return this.http.get(this.baseUrl+"category/bindVisibleCategory");
  }
  getCategorybyId(id){
    return this.http.get(this.baseUrl+"category/categoryById/"+id);
  }

  //--- Sub Category

  // get by category
  getSubCatByCategoryId(id){
    return this.http.get(this.baseUrl+"subcategory/getbyCategoryId/"+id);
  }
}
