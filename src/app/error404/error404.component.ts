import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {
  constructor(private dialogRef: MatDialogRef<Error404Component>,@Inject(MAT_DIALOG_DATA) public data: {name:string}) { }
  close() {
    this.dialogRef.close();
  }
  ngOnInit(){
    setTimeout(()=>{
      this.close();
    },10000)
  }
}
