
import { AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IpfsService } from 'services/ipfs.service';
 

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})


export class ProductsTableComponent implements AfterViewInit, OnInit {
  subscribe:Subscription=new Subscription();
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ipfs:IpfsService,private router:Router) { }

  dataSource = new MatTableDataSource();
  show = true;
  dataLength = 0;

  displayedColumns: string[] =
  ['productImage','title', 'category', 'shortDescription','longDescription'];
title;
getRow(name:string){
  this.title = name;

  var alldata = []
  alldata = this.dataSource.data
  for(var i=0;i<this.dataSource.data.length;i++){
    if(alldata[i].title == name){
      var number = i;
    }
  }
  this.router.navigate(['/view-product'],{queryParams:{number:number,name:this.title}})
}
allData;

ngOnInit(){
  this.subscribe= this.ipfs.product.subscribe(dat=>{
    this.allData = dat;
    var res = dat;
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataLength = res.length;
  })
  if(this.ipfs.allProducts.length != 0){
    this.allData = this.ipfs.allProducts
    this.dataSource = new MatTableDataSource(this.allData);
    this.show = false;
    this.dataSource.paginator = this.paginator; // For pagination
     this.dataSource.sort = this.sort; // For sort
  }
  setInterval(()=>{
    if(this.allData==null){
      this.allData = this.ipfs.allProducts;
      
      this.dataSource = new MatTableDataSource(this.allData);
    }
  },5500); 
  }

  ngAfterViewInit(): void { 
    setInterval(() =>{
      this.show = false;
        this.dataSource.paginator = this.paginator; // For pagination
         this.dataSource.sort = this.sort; // For sort
    }, 5500);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  filterCategory(event) {
    if(event !== "All")
    this.dataSource.filter = event
    else
    this.dataSource.filter = ''
  }

  
}
