import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropDialogComponent } from '../image-crop-dialog/image-crop-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IpfsService } from 'services/ipfs.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css'],
})
export class AddNewProductComponent implements OnInit {
  product: FormGroup;
  show: boolean = false;
  formData: any;
  resProduct: any;


  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private ipfs:IpfsService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.createForm();
this.ipfs.getProduct()  
this.length = 0;
    this.resProduct = '';
  }
  formErrors = {
    title: '',
    category: '',
    shortDescription: '',
    longDescription: '',
  };

  validationMsgs = {
    title: {
      required: 'Product name required',
    },
    category: {
      required: 'Select a category',
    },
    shortDescription: {
      required: 'Description is required',
    },
    longDescription: {
      required: 'Description is required',
    },
  };

  createForm() {
    this.product = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      shortDescription: ['', Validators.required],
      longDescription: ['', Validators.required],
     
      productImage: ['', Validators.required],
      otherImages: this.fb.array(
        [],

        [Validators.minLength(0), Validators.maxLength(5)]
      ),
      status: [true],
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
  categories: string[] = [
    'restaurant',
    'genral store',
    'public place'
  ];

  length: number = 0;
  words: string[] = [];
  calculateWords(value) {
    let count = 0;
    value = value.replace(/\s/g, ' ');
    this.words = value.trim(' ').split(' ');
    for (let i = 0; i < this.words.length; ) {
      if (this.words[i] != '') {
        count += 1;
        i++;
      } else {
        this.words.splice(i, 1);
      }
    }
    this.length = count;
  }

  updateValue() {
    this.product.controls.shortDescription.setValue(this.words.join(' '));
  }


  openSnackbar(message, duration: number) {
    this.snackbar.open(message, 'close', {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  refresh() {
    this.ngOnInit();
  }

 async save(value) {
   
    let top = document.getElementById('top');
    top.scrollIntoView();
    this.show=true;
    this.formData = value;
    var title=this.formData.title
    delete this.formData.color;
    var values= JSON.stringify(this.formData);
  var hash= await this.ipfs.UploadData(values,title)
  if(hash!=null){
    this.router.navigate(['/added-product'],{queryParams:{hash:hash}})
  }
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
  
  images = ['','','','','']
  imagecount = 0;
  openCrop(index) {
    this.dialog
      .open(ImageCropDialogComponent, {
        height: 'auto',
        width: '600px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((data) => {
        this.images[index] = data;
        this.imagecount = 0;
        this.product.setControl('otherImages', this.fb.array(this.images))
      });
  }

  fileChange(event) {
    const files = event.target.files;
    const control = <FormArray>this.product.controls['otherImages'];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = reader.result + '';
        control.push(this.fb.control(base64));
      };
      reader.readAsDataURL(files[i]);
    }
    event.srcElement.value = null;
  }

  removeImage(ind) {
    const control = <FormArray>this.product.controls['otherImages'];
    control.removeAt(ind);
  }
}
