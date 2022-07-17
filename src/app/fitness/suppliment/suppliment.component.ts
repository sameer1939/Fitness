import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-suppliment',
  templateUrl: './suppliment.component.html',
  styleUrls: ['./suppliment.component.css']
})
export class SupplimentComponent implements OnInit {

  constructor() {
    AOS.init();
   }

  ngOnInit(): void {
  }

}
