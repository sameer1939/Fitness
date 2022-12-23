import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { StoryDialogComponent } from 'src/app/dialogBox/story-dialog/story-dialog.component';
import { StoriesVM } from 'src/app/models/stories';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);
  @Input() story:StoriesVM[];
  constructor(private breakpointObserver: BreakpointObserver,private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      940: {
        items: 3
      }
    }
  }


  openDialog(url,title) {
    const dialogRef = this.dialog.open(StoryDialogComponent, {
      maxHeight: '80vh',
      maxWidth: '100vh',
      data: {
        videoTitle: title,
        videoUrl:url
      }
    });
  }
}
