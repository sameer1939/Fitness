import { Component, Input, OnInit } from '@angular/core';
import { SubCategory } from 'src/app/ViewModels/subcategory';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() subCategory:SubCategory[];
  @Input() popularTag:SubCategory[];
  constructor() { }

  ngOnInit(): void {
  }

}
