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
product;
loading=true;
img1='';
img2='';
img3='';
img4='';
img5='';
  constructor(private route:ActivatedRoute,private ipfs:IpfsService,
    private router:Router,
    private error:ErrorServService){}
 async ngOnInit(){
   this.route.queryParams.subscribe(value=>{
        this.product = this.ipfs.viewProductData(value.number)

       if(this.product==null){        
         this.loading = false;
         this.ipfs.getdetails(value.number).then(info=>{
          this.product = info
         
            this.loading=true;
         }).catch(error=>{
           console.log(error)
         });
        
        }
   })
 }
 sideImage(){
   if(this.product.otherImage!=null)
   this.img1=this.product.otherImage[0];
   if(this.product.otherImage[1]!=null)
   this.img1=this.product.otherImage[1];
   if(this.product.otherImage[2]!=null)
   this.img1=this.product.otherImage[2];
   if(this.product.otherImage[3]!=null)
   this.img1=this.product.otherImage[3];
   if(this.product.otherImage[4]!=null)
   this.img1=this.product.otherImage[4];
   if(this.product.otherImage[5]!=null)
   this.img1=this.product.otherImage[5];
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