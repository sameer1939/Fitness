import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Comments } from 'src/app/models/comments';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-reply-dialog',
  templateUrl: './reply-dialog.component.html',
  styleUrls: ['./reply-dialog.component.css']
})
export class ReplyDialogComponent implements OnInit {

  artComment = new Comments();
  constructor(public dialogRef: MatDialogRef<ReplyDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private commentService: CommentService,
  private alertify: AlertifyService,
  private route: ActivatedRoute) {

  }

  ngOnInit(): void {
  }

  addComments(comment:NgForm){
    this.artComment.name=comment.control.get('name').value;
    this.artComment.email=comment.control.get('email').value;
    this.artComment.message=comment.control.get('message').value;
    this.artComment.parentId=this.data.id;
    this.artComment.articleId=this.data.artId;

    this.commentService.addComments(this.artComment).subscribe(data => {
      this.alertify.success("Reply Added Successfully");
      comment.reset();
      this.dialogRef.close();
    })
  }

}
