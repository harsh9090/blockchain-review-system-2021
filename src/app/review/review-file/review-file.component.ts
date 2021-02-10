import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IpfsService } from 'services/ipfs.service';

@Component({
  selector: 'app-review-file',
  templateUrl: './review-file.component.html',
  styleUrls: ['./review-file.component.css']
})
export class ReviewFileComponent implements OnInit {
allReviews=[]
  constructor(private ipfs:IpfsService,private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(data=>{
      this.ipfs.getReview(data.name).then(data=>{
        this.allReviews = data;
        console.log(this.allReviews)
      })
    })
  }

}
