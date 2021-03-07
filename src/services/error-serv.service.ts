import {  Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Error404Component } from 'app/error404/error404.component';
import { ReviewShowComponent } from '../app/review-show/review-show.component'
@Injectable({
  providedIn: 'root'
})
export class ErrorServService {
  constructor(public dialog: MatDialog) {}

  openReview(data){
    const dialogRef = this.dialog.open(ReviewShowComponent,{
      data:{name:data}, height: '300px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  async openDialog(data:string) {
    const dialogRef = this.dialog.open(Error404Component,{
      data:{name:data}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}