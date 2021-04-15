import { Component, OnInit} from '@angular/core';
import { EthercontractService } from 'services/ethercontract.service';
import { IpfsService } from 'services/ipfs.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private ipfs:IpfsService,private eth:EthercontractService){}
  ngOnInit(){
    this.ipfs.account().then(data=>{

    })
    this.eth.totalReview().then(data=>{
      
    })
    this.ipfs.initialProduct().then(value=>{
    })
    this.ipfs.getLastProduct().then(value=>{
    })
     this.ipfs.getLastReviews().then(data=>{
  
     })
     this.ipfs.getUserReviews().then(data=>{
       console.log(data)
     })
     this.ipfs.username('main').then(data=>{
       
     })
  }
}