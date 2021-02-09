import {  Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Error404Component } from 'app/error404/error404.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorServService {
  constructor(public dialog: MatDialog) {}

  openDialog(data:string) {
    const dialogRef = this.dialog.open(Error404Component,{
      data:{name:data}, height: '150px',
      width: '370px',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}