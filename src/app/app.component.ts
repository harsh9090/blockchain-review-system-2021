import { Component, OnInit} from '@angular/core';
import { IpfsService } from 'services/ipfs.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private ipfs:IpfsService){}
  ngOnInit(){
    this.ipfs.account()
    this.ipfs.initialProduct().then(value=>{
    })
  }
}
