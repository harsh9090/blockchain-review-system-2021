import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCropDialogComponent } from 'app/product/image-crop-dialog/image-crop-dialog.component';
import { IpfsService } from 'services/ipfs.service';

interface ICompany {
  id: number;
  rating: number
}
@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})

export class AddReviewComponent {

  ratingClicked: number;
  itemIdRatingClicked: string;
  items: ICompany[] = [
    { 'id': 0, 'rating': 3}
  ]; 
  product: FormGroup;
  show: boolean = false;
  formData: any;
  resProduct: any;
  title;
  
  constructor(
    private route:ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private ipfs:IpfsService,
    private router:Router
  ) {}
  rating:number;
  ratingComponentClick(clickObj: any): void {
    const item = this.items.find(((i: any) => i.id === clickObj.itemId));
    if (!!item) {
      this.rating = item.rating;
      item.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating; 
    
    }

  }
 

  ngOnInit(): void {
    this.route.queryParams.subscribe(value=>{
      this.title = value.name;
    })
    this.createForm();
this.ipfs.getProduct()
    this.resProduct = '';
  }
  formErrors = {
    review: '',
    rating:0
  };

  validationMsgs = {
    review: {
      required: 'Review details are reuqired',
    },
  };

  createForm() {
    this.product = this.fb.group({
      title: [{value:this.title,disabled:true}],
      review: ['', Validators.required],     
      productImage: ['']
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

  selectedFile = null;


  openSnackbar(message, duration: number) {
    this.snackbar.open(message, 'close', {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

 async save(value) {
    this.show=true;
    this.formData = value;
    var data = JSON.stringify(this.formData)
    await this.ipfs.addReview(this.title,data,this.rating).then(productData=>{
     
    });
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

  removeImage(ind) {
    const control = <FormArray>this.product.controls['otherImages'];
    control.removeAt(ind);
  }

}
