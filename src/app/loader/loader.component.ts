import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  show: boolean;
  constructor(private _loaderService: LoaderService) { }

  ngOnInit() {
    this._loaderService.loadState.subscribe(res => {
      this.show = res;
    });
  }

}
