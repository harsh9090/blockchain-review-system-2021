import { Component, OnInit } from '@angular/core';
import { ErrorServService } from 'services/error-serv.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  constructor(private serv:ErrorServService) { }
  editForm(){
    this.serv.editDetails();
  }
  ngOnInit(): void {
  }

}
