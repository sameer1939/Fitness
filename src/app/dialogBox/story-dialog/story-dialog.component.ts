import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-story-dialog',
  templateUrl: './story-dialog.component.html',
  styleUrls: ['./story-dialog.component.css']
})
export class StoryDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StoryDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    
   }

  ngOnInit(): void {
  }
}
