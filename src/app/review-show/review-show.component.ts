import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-review-show',
  templateUrl: './review-show.component.html',
  styleUrls: ['./review-show.component.css']
})
export class ReviewShowComponent implements OnInit {
  rating:number;
  constructor(private dialogRef: MatDialogRef<ReviewShowComponent>,@Inject(MAT_DIALOG_DATA) public data: {name:string}) { }
  close() {
    this.dialogRef.close();
  }
  ratingComponentClick(clickObj: any): void {
  }
  ngOnInit(){
   
  }
}
