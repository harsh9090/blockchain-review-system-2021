import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Error404Component } from 'app/error404/error404.component';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css']
})
export class AddDetailsComponent implements OnInit {
  @ViewChild('ref') value:ElementRef;
  constructor(private dialogRef: MatDialogRef<Error404Component>) { }
  close() {
    this.dialogRef.close();
  }
  ngOnInit(){
}
}
