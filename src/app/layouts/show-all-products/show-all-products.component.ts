import { Component, AfterViewInit } from '@angular/core';
import { ErrorServService } from 'services/error-serv.service';

@Component({
  selector: 'app-show-all-products',
  templateUrl: './show-all-products.component.html',
  styleUrls: ['./show-all-products.component.css']
})
export class ShowAllProductsComponent implements AfterViewInit {
  constructor(private serv:ErrorServService) { }
  ngAfterViewInit(): void {
  }
  click(){
    this.serv.openDialog('there is error');
  }
}
