import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ErrorServService } from 'services/error-serv.service';
import { EthercontractService } from 'services/ethercontract.service';
import { IpfsService } from 'services/ipfs.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  allreviews: any;
  name: string;
  image:string="./assets/img/img1.jpg";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<any>;

  constructor(private serv:ErrorServService,private ipfs:IpfsService,private eth:EthercontractService) { }

  editForm(){
    this.serv.editDetails();
  }

  fakeArray(length: number): Array<any> {
    if (length >= 0) {
      return new Array(length);
    }
  }

  ngOnInit(): void {
    var name = localStorage.getItem('userData');
    if(name){
      var arr = JSON.parse(name);
      this.name = arr.title;
      if(arr.productImage)
      this.image = arr. productImage;
    }
    if(this.ipfs.userAllReview){
      var data = this.ipfs.userAllReview
      this.allreviews = data;
      for(var i=0;i<this.allreviews.length;i++){
        if(!this.allreviews[i].productImage){
          this.allreviews[i].productImage = '../../../assets/img/im1.jpg';
        }
      }
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      //user all reviews
    }
  this.ipfs.username('sec').then(data=>{
    this.name = data.title;
    if(data.productImage)
    this.image = data.productImage;
  })
  this.ipfs.userReviews.subscribe(data=>{
    this.allreviews = data;
    for(var i=0;i<this.allreviews.length;i++){
      if(!this.allreviews[i].productImage){
        this.allreviews[i].productImage = '../../../assets/img/im1.jpg';
      }
    }
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
    //user all data
  })

  this.eth.getPoints().then(data=>{
    console.log(data)
  })


  } 
  datavalue;
  showReview(card){
    var data;
    for(var i=0;i<this.allreviews.length;i++){
      if(card.productName == this.allreviews[i].productName){
        if(card.review == this.allreviews[i].review){
          data = this.allreviews[i];
        }
      }
    }
    if(!data.productImage){
      data.productImage = '../../../assets/img/im1.jpg';
    }
   var sub = {
     content : data.review,
     image: data.productImage,
     rating : card.rating,
     username: this.name
   }
    this.serv.openReview(sub);
  }
}
