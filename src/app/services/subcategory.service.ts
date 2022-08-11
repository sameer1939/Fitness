import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubCategory } from '../ViewModels/subcategory';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  baseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) { }

  getRandomVisibleSubCategory(records:number) {
    return this.http.get<SubCategory[]>(this.baseUrl + "subcategory/bindRandomVisibleSubCategory/"+records);
  }

}
