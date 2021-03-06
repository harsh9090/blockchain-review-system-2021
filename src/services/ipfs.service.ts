import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as IPFS from 'ipfs-mini'
import { Subject } from 'rxjs';
import { ErrorServService } from './error-serv.service';
import { EthercontractService } from './ethercontract.service';


@Injectable({
  providedIn: 'root'
})
export class IpfsService {
  constructor(private ethcontract: EthercontractService, private router: Router, private error: ErrorServService) { }

  // tslint:disable-next-line:member-ordering
  product = new Subject<[]>();
  lastProducts;
  lastReviews;
  productDetail = new Subject<[]>();
  allProducts = [];
  result = '';
  data = '';
  interval;
  addedProd = '';
  LastFiveReviews = new Subject<any>();
  LastFiveProducts = new Subject<any>();
  ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
  dataInfo;


  async UploadData(values: string, title: string) {
    this.addedProd = values;
    await this.ipfs.add(values)
      .then(async result => {
        this.result = result;
       await this.ethcontract.addDetails(result, title).then(result => {
          this.initialProduct();
          this.getLastProduct()
          return result;
        }).catch(error => {
          return error;
        });
        return result;
      })
    return this.result;
  }


  async initialProduct(){
    await this.getProduct().then((res: []) => {
            let time = 0;
      this.interval = setInterval(() => {
       this.product.next(res);
       this.allProducts = res;
       time++;
       if (time >= 3){
        clearInterval(this.interval)
       }
    }, 4000);
    })
  }

   addedone(){
    return this.addedProd;
  }



  async ratingOfProduct(pname: string){
    var ratings;
    await this.ethcontract.getReviewFile(pname).then(data => {
      ratings = data[1].words[0]
      return ratings;
    })
    return await ratings;
  }

  async getdetails(prname: string){
    await this.ethcontract.getProductDetail(prname).then(async data => {
      await this.GetData(data).then((information: string) => {
        this.dataInfo = information;
      }).catch(error => {
        })
      return await this.dataInfo;
    })
    return await this.dataInfo
  }


  viewProductData(name: string){
    for (var i = 0; i < this.allProducts.length; i++){
      if (name == this.allProducts[i].title){
        return this.allProducts[i];
      }
    }
  }


  async getReview(prname){
    var data = [];
    await this.ethcontract.getReviewFile(prname).then(async file => {
      if (file[0] == ""){
        return null;
      }
     await this.GetData(file[0]).then((data2) => {
       for (let i = 0; i < data2.length; i++){
         data.push(data2[i]);
       }
      });
      return await data;
    });
    return await data;
  }

  async addReview(prname: any, values, rating: number) {
    var allData = [];
    var oneValue = [];
    oneValue.push(values);
    var stringValue = JSON.stringify(oneValue);
    await this.ethcontract.getReviewFile(prname).then(file => {
      if (file[0] != ""){

        this.GetData(file[0]).then(data => {
          for (let i = 0; i < data.length; i++)
          allData.push(data[i]);
          allData.push(values);
          var stringData = JSON.stringify(allData);
          this.ipfs.add(stringData)
          .then(hash1 => {

            this.ipfs.add(stringValue)
          .then(async hash2 => {
          await  this.ethcontract.addReview(prname, rating, hash1, hash2).then(result => {
            this.error.openDialog('Review Added Successfully')
            this.getLastReviews();
            this.getUserReviews();
              this.router.navigate(['dashboard']);
            return result;
            }).catch(error => {
              return error;
            });
          })
        }
        )
          }).catch(e => {
            return e;
          })
        }
        else{
          this.ipfs.add(stringValue)
          .then(hash1 => {

            this.ipfs.add(stringValue)
          .then(hash2 => {

            this.ethcontract.addReview(prname, rating, hash1, hash2).then(result => {
              this.error.openDialog('Review Added Successfully')
              this.getLastReviews();
              this.getUserReviews();
              this.router.navigate(['dashboard']); 
              return result;
            }).catch(error => {
              return error;
            });
          })
        }
        )
        }
      }
      ).catch(e => {
        return e;
      });
      return await 'success'
    }
    



  async getProduct() {
    var product = []
      await  this.ethcontract.getProduct().then((result: any) => {
        
          for (let numb = 0; numb < result.length; numb++){
              this.GetData(result[numb]).then(data => {
               product.push(data) 
              }).catch(error => {
                return error;
              })
        }
        }).catch(error => {
          return error;
        });
    return product;
  }


 async GetData(hash){
   await this.ipfs.cat(hash).then(result => {
      this.data = result
      var data = JSON.parse(this.data);
      this.data = data
      return data;
    }).catch(error => {
      return error;
    })
    return this.data;
  }
  async account(){
    this.ethcontract.getAccountInfo().then(data => {

    })
  }
  userResult;
  async addUser(data: any) {
    var uData = JSON.stringify(data)
    await this.ipfs.add(uData)
      .then(async result1 => {
       await this.ethcontract.addUser(result1).then(result => {
      
         localStorage.setItem('userData', uData);
         return result;
        }).catch(error => {
          return error;
        });
        this.userResult = result1;
        return result1;
      })
      return this.userResult;
  }
  userReviews = new Subject<any>();
userAllReview = [];
  async getUserReviews() {
    var data = [];
    await this.ethcontract.getUserReviewAll().then(async (file: any) => {
      if (file[0] == "  "){
        return null;
      }
      else{
       for (var i = 0; i < file.length; i++){
         if (file[i] == "  "){
           return null;
         }
     await this.GetData(file[i]).then((data2) => {
       var final = JSON.parse(data2)
       data.push(final)
      });
    }
    this.userAllReview = data;
    await this.userReviews.next(data);
    return await data;
  }
});

this.userAllReview = data;

await this.userReviews.next(data);
return await data;

}
userAllProducts = [];
  async getUserProdcts() {
    var data = [];
    await this.ethcontract.getUserProductAll().then(async (file: any) => {
      if(file.length == 0){
        data = null;
        return null;
      }
       for (var i = 0; i < file.length; i++){
     await this.GetData(file[i]).then((data2) => {
       data.push(data2)
      });
    }
    this.userAllProducts = data;
    return await data;
});
this.userAllProducts = data;
return await data;

}




userInfo;
  async getUser(str: string){
    await this.ethcontract.getUserDetail(str).then(async data => {
      if (data){
      await this.GetData(data).then((information: string) => {
        this.userInfo = information;
      }).catch(error => {
      })
    }
    else{
      this.userInfo = '';
    }
      return await this.userInfo;
    })

    return await this.userInfo;
  }
  
  async username(str: string){
    var userData;
    await this.getUser(str).then(data => {
    userData = data;
      localStorage.setItem("userData", JSON.stringify(data));
    return data;
   })
   return await userData;
  }
  async getLastProduct() {
      var data = [];
      await this.ethcontract.getLastProducts().then(async (file: any) => {
        if (file[0] == "  "){
          return null;
        }
        else{
         for (var i = 0; i < file.length; i++){
           if (file[i] == "  "){
             return null;
           }
       await this.GetData(file[i]).then((data2) => {
         data.push(data2)
        });
      }
      return await data;
    }
});
this.lastProducts = data;
this.LastFiveProducts.next(data);
return await data;
}

  async getLastReviews() {
      var data = [];
      
      await this.ethcontract.getLastReviews().then(async (file: any) => {
        if (file[0] == "  "){
          return null;
        }
        else{
         for (var i = 0; i < file.length; i++){
           if (file[i] == "  "){
             return null;
           }
       await this.GetData(file[i]).then((data2) => {
         var final = JSON.parse(data2)
         data.push(final)
        });
      }
      return await data;
    }
});
this.lastReviews = data;
this.LastFiveReviews.next(data);
return await data;
}
}