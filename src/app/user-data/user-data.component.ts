import { Component, OnInit } from '@angular/core';
import { ErrorServService } from 'services/error-serv.service';
import { IpfsService } from 'services/ipfs.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  name: string;
  image:string="./assets/img/img1.jpg";
  constructor(private serv:ErrorServService,private ipfs:IpfsService) { }
  editForm(){
    this.serv.editDetails();
  }
  ngOnInit(): void {
    var name = localStorage.getItem('userData');
    if(name){
      var arr = JSON.parse(name);
      this.name = arr.title;
      if(arr.productImage)
      this.image = arr. productImage;
    }
  this.ipfs.username('sec').then(data=>{
    
    this.name = data.title;
    if(data.productImage)
    this.image = data.productImage;
  })
  this.ipfs.getUserReviews().then(data=>{
  })
  }
}
