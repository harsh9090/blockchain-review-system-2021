import { Component, OnInit } from '@angular/core';
import { ErrorServService } from 'services/error-serv.service';
import { IpfsService } from 'services/ipfs.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  constructor(private serv:ErrorServService,private ipfs:IpfsService) { }
  editForm(){
    this.serv.editDetails();
  }
  ngOnInit(): void {
    this.ipfs.getUser().then(value=>{
    })
  }

}
