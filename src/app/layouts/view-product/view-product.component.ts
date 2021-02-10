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
  products={title:'xyz',catogery:'xyz',shortDescription:'xyz',longDescription:'xyz',productImage:'xyz'};
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
addReview(){
   this.router.navigate(['add-review'],{queryParams:{name:this.product.title}})
 }
test(){
  this.error.openDialog('error');
}
}