import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subscriber } from '../models/subscriber';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  baseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) { }

  addSubscribers(subs:Subscriber){
    return this.http.post(this.baseUrl+"subscribers/subscribe",subs);
  }

}
