import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-steriod',
  templateUrl: './steriod.component.html',
  styleUrls: ['./steriod.component.css']
})
export class SteriodComponent implements OnInit {

  constructor() {
    AOS.init();
   }

  ngOnInit(): void {
  }

}
