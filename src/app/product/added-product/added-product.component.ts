import { Component, OnInit } from '@angular/core';
import { IpfsService } from 'services/ipfs.service';

@Component({
  selector: 'app-added-product',
  templateUrl: './added-product.component.html',
  styleUrls: ['./added-product.component.css']
})
export class AddedProductComponent implements OnInit {

  constructor(private ipfs:IpfsService) { }
  data=null;
  load=true;
  stop = false;
  ngOnInit(): void {
  var dat = this.ipfs.addedone()
  if(dat){
    this.load=false;
  this.data = JSON.parse(dat)
  }
  else{
    this.stop = true;
  }
}
}
