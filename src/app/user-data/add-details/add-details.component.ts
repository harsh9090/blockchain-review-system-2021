import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Error404Component } from 'app/error404/error404.component';
import { IpfsService } from 'services/ipfs.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ImageCropDialogComponent } from 'app/product/image-crop-dialog/image-crop-dialog.component';

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
  product: FormGroup;
  constructor(private dialogRef: MatDialogRef<Error404Component>,private ipfs:IpfsService, private dialog: MatDialog,) { }
  close() {
    this.dialogRef.close();
  }
  ngOnInit(){
    this.ipfs.addUser(this.data).then(data=>{
    })
}

uploadMainImage() {
  this.dialog
    .open(ImageCropDialogComponent, {
      height: 'auto',
      width: '600px',
      disableClose: true,
    })
    .afterClosed()
    .subscribe((data) => {
      this.product.controls['productImage'].patchValue(data);
    });
}
}
