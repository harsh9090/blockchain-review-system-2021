import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCropDialogComponent } from 'app/product/image-crop-dialog/image-crop-dialog.component';
import { ErrorServService } from 'services/error-serv.service';
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
    private err:ErrorServService,
    private router:Router
  ) {}
  rating:number;
  ratingComponentClick(clickObj: any): void {
    const item = this.items.find(((i: any) => i.id === clickObj.itemId));
    if (!!item) {
      
      item.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating; 
      this.rating = item.rating;
    }

  }
 
  ngOnInit(): void {
   setTimeout(()=>{
    var name = localStorage.getItem("userData");
    var arr = JSON.parse(name);
    if(arr){
      this.product.get('username').setValue(arr.title)
    }
   },100)
   setTimeout(()=>{
    var name = localStorage.getItem("userData");
    var arr = JSON.parse(name);
    if(!arr){
      this.err.openDialog(`Please Create Profile
             OR
       Login to MataMask`)
      this.router.navigate(['/dashboard']);
    }
    else{
      this.product.get('username').setValue(arr.title)
    }
   },5000)
    this.route.queryParams.subscribe(value=>{
      this.title = value.name;
    })
    this.createForm();
this.ipfs.getProduct()
    this.resProduct = '';
  }
  formErrors = {
    review: '',
    username:'',
    rating:0
  };

  validationMsgs = {
    review: {
      required: 'Review details are reuqired',
    },
    username: {
      required: 'Username is reuqired',
    },
  };

  createForm() {
    var name = localStorage.getItem("userData");
    var user = JSON.parse(name);
    this.product = this.fb.group({
      title: [{value:this.title,disabled:true}],
      username:[{value:'--',disabled:true}],
      review: ['', Validators.required],
      time: [new Date()], 
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
    if(this.product.get('username').value == ''){
      this.err.openDialog('Please Create Your Profile<BR><p align=center> OR</p><BR> Login to MataMask')
    }
    var data1 = {
      username: this.product.get('username').value,
      productName: this.title,
      review: this.formData.review,
      productImage:this.formData.productImage,
      rating:this.rating,
      time:new Date()
    }
    
    var data = JSON.stringify(data1)
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
