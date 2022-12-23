import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CategoryService } from "src/app/services/menu.service";
import { Category } from "src/app/ViewModels/category";
import * as $ from "jquery";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {

  show: boolean = true;
  visibleMenu: Category[];
  constructor(private menuService: CategoryService,private router:Router) {}

  ngOnInit(): void {
    this.menuService.bindVisibleCategory().subscribe((data: Category[]) => {
      console.log(data);
      this.visibleMenu = data;
    });
  }

  GotoHome(){
    this.router.navigate(['/']);
  }

}
