import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css']
})
export class GiftsComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<GiftsComponent>,@Inject(MAT_DIALOG_DATA) public data: {name:string}) { }
  close() {
    this.dialogRef.close();
  }
  ngOnInit(){
  
  }
}
