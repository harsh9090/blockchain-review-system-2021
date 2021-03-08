import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorServService } from 'services/error-serv.service';
import { IpfsService } from 'services/ipfs.service';


export interface Post {
  image?: File|string|Observable<string>|{ path: string|any, url: string|Observable<string> };
  content: string;
  rating: number;
}

@Component({
  selector: 'app-review-file',
  templateUrl: './review-file.component.html',
  styleUrls: ['./review-file.component.css']
})
export class ReviewFileComponent implements OnInit {
 
  show = true;
  allReviews = [];
  searchText: string;
  length: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<any>;
  constructor(private ipfs: IpfsService, private route: ActivatedRoute,private reivew:ErrorServService) {
    
  }
noReview=false;
  ngOnInit(): void {
    this.show=true;
    this.route.queryParams.subscribe(data => {
      this.ipfs.getReview(data.name).then( data1 => {
        for(let i=0;i<data1.length;i++){
          var post= {image: '../../../assets/img/im1.jpg',content:'',rating:3,username:'undefined'}
          var rev = JSON.parse(data1[i])
          if(rev.productImage!=''){
            post.image = rev.productImage
          }
          post.username = rev.username
          post.rating = rev.rating
          post.content=rev.review
          this.allReviews.push(post)
        } 
        this.dataSource = new MatTableDataSource<any>(this.allReviews);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      this.show=false;
      if(this.allReviews.length == 0){   
        this.noReview =true;
      }
      })
    });
  }
  showReview(i){
    this.reivew.openReview(this.allReviews[i])
  }
  counter(i: number) {
    return new Array(i);
}

}
