import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chartist from 'chartist';
import { ErrorServService } from 'services/error-serv.service';
import { EthercontractService } from 'services/ethercontract.service';
import { IpfsService } from 'services/ipfs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private eth:EthercontractService,private ipfs:IpfsService,
    private router:Router,private view:ErrorServService) { }
  totalProducts;
  totalReviews;

  viewReview(number){
    var review = {
      username: this.reviews[number].username,
      content: this.reviews[number].review,
      image: this.reviews[number].productImage,
      rating : this.reviews[number].rating
    }
    if(!review.image){
      review.image  = '../../../assets/img/im1.jpg';
    }
    this.view.openReview(review)
  }
  viewProduct(num){
    this.router.navigate(['/view-product'],{queryParams:{number:num,name:this.products[num].title}})
  }

  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  }
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  }
  reviews;
  products;
  showproduct= false;
  showReview = false;
  ngOnInit() {
    this.totalReviews = '--';
    this.totalProducts = '--';
    this.products= this.ipfs.lastProducts;
  this.reviews = this.ipfs.lastReviews;
  if(this.products){
    this.showproduct = true;
  }
  if(this.reviews){
    this.showReview = true;
  }
    this.eth.totalReview().then(data=>{
    this.totalReviews=data;
    if(data==null){
      this.totalReviews = 10;
    }  
  })
  this.eth.totalProduct().then(data=>{
    this.totalProducts=data;
    if(data==null){
      this.totalProducts = 10;
    }  
  })
  this.products= this.ipfs.lastProducts;
  this.reviews = this.ipfs.lastReviews;
  this.ipfs.LastFiveProducts.subscribe(data=>{
    this.showproduct = true;
   this.products = data;
   
  })
  this.ipfs.LastFiveReviews.subscribe(data=>{
    this.showReview = true;
    this.reviews = data;
  })

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, 
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


   

      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      this.startAnimationForBarChart(websiteViewsChart);
  }

}
