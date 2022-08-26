import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  baseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) { }

  bindVisibleStory(){
    return this.http.get(this.baseUrl+"stories/bindVisibleStory");
  }

  getStorybyId(id) {
    return this.http.get(this.baseUrl + "stories/storyById/" + id);
  }

}
