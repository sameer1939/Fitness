import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-excercise',
  templateUrl: './excercise.component.html',
  styleUrls: ['./excercise.component.css']
})
export class ExcerciseComponent implements OnInit {

  constructor() {
    AOS.init();
   }

  ngOnInit(): void {
  }

}
