import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Error404Component } from 'app/error404/error404.component';
import { IpfsService } from 'services/ipfs.service';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css']
})
export class AddDetailsComponent implements OnInit {
  data = {
    name:'harsh',
    date:'yes'
  } 
  constructor(private dialogRef: MatDialogRef<Error404Component>,private ipfs:IpfsService) { }
  close() {
    this.dialogRef.close();
  }
  ngOnInit(){
    this.ipfs.addUser(this.data).then(data=>{
    })
}
}
