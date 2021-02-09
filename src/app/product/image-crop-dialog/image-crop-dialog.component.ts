import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import 'hammerjs';

@Component({
  selector: 'app-image-crop-dialog',
  templateUrl: './image-crop-dialog.component.html',
  styleUrls: ['./image-crop-dialog.component.css'],
})
export class ImageCropDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<ImageCropDialogComponent>
  ) {}

  ngOnInit(): void {}

  imageChangedEvent: any = '';
  croppedImage: any = '';
  show = false;
  fileChange(event: any): void {
    this.show = true;
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  saveImage() {
    this.dialogRef.close(this.croppedImage);
  }
}
