import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Error404Component } from 'app/error404/error404.component';
import { IpfsService } from 'services/ipfs.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ImageCropDialogComponent } from 'app/product/image-crop-dialog/image-crop-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css']
})
export class AddDetailsComponent implements OnInit {
  product: FormGroup;
  formData: any;
  resProduct: any;
  constructor(private dialogRef: MatDialogRef<Error404Component>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private ipfs:IpfsService,
    private router:Router) { }
  close() {
    this.dialogRef.close();
  }
  ngOnInit(){
    this.createForm();
    this.resProduct = '';
}
formErrors = {
  title: ''
};

validationMsgs = {
  title: {
    required: 'Product name required',
  }
};

createForm() {
  this.product = this.fb.group({
    title: ['', Validators.required],
    productImage: [''],
    time: [new Date()]
  });
 
  this.product.valueChanges.subscribe((data) => this.onValueChanged(data));
}

onValueChanged(data: any) {
  if (!this.product) {
    return;
  }
  const form = this.product;
  for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
    this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMsgs[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key];
          }
        }
      }
    }
  }
}

openSnackbar(message, duration: number) {
  this.snackbar.open(message, 'close', {
    duration: duration,
    verticalPosition: 'top',
    horizontalPosition: 'center',
  });
}

 async save(value) {
   
  this.formData = value;
  console.log(this.formData)
  this.ipfs.addUser(value).then(data=>{
    console.log(data)
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
deleteMainImage() {
  this.product.controls['productImage'].setValue('');
}

}
