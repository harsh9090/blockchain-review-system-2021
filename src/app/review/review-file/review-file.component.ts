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
  myArray: Post = {
    image: '../../../assets/img/675016.jpg',
    content: 'Blockchain.com was launched in August 2011 and was founded by Ben Reeves a founding team member at the crypto-currency exchange Coinbase. Reeves had a differing opinion on the future of Coinbase, so he left Coinbase to start Blockchain.com,[1] which provides data on recent transactions, mined blocks in the bitcoin blockchain, charts on the bitcoin economy, and statistics and resources for developers. In February 2014, Apple Inc. removed the Blockchain.com app from the iOS App Store, prompting a harsh response from Blockchain community along with a public outcry in the bitcoin community, most notably within the Reddit community.[2] In July 2014, Apple reinstated the Blockchain.com app. In October 2014, Blockchain.com closed a $30.5 million fundraising round from Lightspeed Venture Partners and Mosaic Ventures, which was the biggest round of financing in the digital currency sector at that time. In July 2019, Blockchain.com launched its cryptocurrency exchange.[5] In September 2020, the company joined the Coalition for App Fairness which aims to negotiate for better conditions for the inclusion of apps in app stores.',
    rating: 3
  }
  show = true;
  allReviews = [];
  searchText: string;
  length: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Post>;
  constructor(private ipfs: IpfsService, private route: ActivatedRoute,private reivew:ErrorServService) {
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.ipfs.getReview(data.name).then( data1 => {
        var reviews = [];
        this.allReviews = data1;
        for(let i=0;i<data1.length;i++)
        reviews.push(this.myArray)
        console.log(data1)
        this.dataSource = new MatTableDataSource<Post>(reviews);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      })
    });
  }
  showReview(i){
    this.reivew.openReview(i)
  }
  counter(i: number) {
    return new Array(i);
}

}
