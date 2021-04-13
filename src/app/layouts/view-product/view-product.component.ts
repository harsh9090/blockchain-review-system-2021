import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorServService } from 'services/error-serv.service';
import { IpfsService } from 'services/ipfs.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  today = new Date();
  diffdays: number;
product;
loading=true;
img1='';
img2='';
img3='';
img4='';
img5='';
rating;
  constructor(private route:ActivatedRoute,private ipfs:IpfsService,
    private router:Router,
    private error:ErrorServService){}
    fakeArray(length: number): Array<any> {
      if (length >= 0) {
        return new Array(length);
      }
    }
 async ngOnInit(){
   this.route.queryParams.subscribe(async value=>{
     
        this.product = this.ipfs.viewProductData(value.name)
        this.ipfs.ratingOfProduct(value.name).then(data=>{
        
         this.rating = data;
        })
        if(this.product==null){

         this.loading = false;
       await  this.ipfs.getdetails(value.name).then(info=>{
       
          this.product = info
            this.loading=true;
            
            const past = new Date(this.product.time);
            
            const diff = Math.abs(this.today.getTime() - past.getTime());
            this.diffdays = Math.ceil(diff / (1000 * 3600 * 24));

         }).catch(error=>{
          this.error.openDialog('error in fatching details');
         });
        }
        else{
          const past = new Date(this.product.time);
            
            const diff = Math.abs(this.today.getTime() - past.getTime());
            this.diffdays = Math.ceil(diff / (1000 * 3600 * 24));
        }
      
       await this.sideImage();
   })
 }
 sideImage(){
   if(this.product.otherImages!='')
   this.img1=this.product.otherImages[0];
   if(this.product.otherImages[1]!='')
   this.img2=this.product.otherImages[1];
   if(this.product.otherImages[2]!='')
   this.img3=this.product.otherImages[2];
   if(this.product.otherImages[3]!='')
   this.img4=this.product.otherImages[3];
   if(this.product.otherImages[4]!='')
   this.img5=this.product.otherImages[4];
 }

 viewReview(){
   this.router.navigate(['view-review'],{queryParams:{name:this.product.title}});
 }

addReview(){
   this.router.navigate(['add-review'],{queryParams:{name:this.product.title}})
 }

test(){
  this.error.openDialog('error');
}
}