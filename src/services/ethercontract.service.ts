import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const Web3 = require('web3');
import * as TruffleContract from 'truffle-contract';
import { ErrorServService } from './error-serv.service';
declare let require:any;
declare let window:any;
let tokenAbi = require('../../build/contracts/MyContract.json')

@Injectable({
  providedIn: 'root'
})
export class EthercontractService {
  private web3Provider:null;
  
  account:string;
  constructor(private error:ErrorServService,private route:Router) {
    window.eth_requestAccounts;
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    window.web3 = new Web3(this.web3Provider);
  }
 async getReviewFile(productName:string){
  window.ethereum.autoRefreshOnNetworkChange = false;
    var promises =await new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(this.web3Provider);
      paymentContract.deployed().then(function(instance) {
          return instance.getProductReviewFile(productName)
        }).then(function(data) {
            return resolve(data);
        }).catch(function(error){
          return reject('ReviewFile');
        });
    });
    return promises;
  }
  getAccountInfo() {
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(function(err, account) {
        if(err === null) {
          window.web3.eth.getBalance(account, function(err, balance) {
            if(err === null) {
              return resolve({fromAccount: account});
            } else {
              return reject('Account');
            }
          });
        }
        else{
          return err
        }
      });
    });
  }
async getAllreviews(){
  var promises =await new Promise((resolve, reject) => {
    
    var acc=this.account
    let paymentContract = TruffleContract(tokenAbi);
   
    paymentContract.setProvider(this.web3Provider);
    
    paymentContract.deployed().then(function(instance) {
        return instance.addProduct({
          from: acc
        });
      }).then(function(status) {
        if(status) {
          return resolve({status:true});
        }
      }).catch(function(error){
        return reject('AllReview');
      });
  });
  return promises;

}
  async addDetails(data:any,title:string) {
    await this.getAccountInfo().then((data2:any)=>{
      this.account = data2.fromAccount
    });
    var promises =await new Promise((resolve, reject) => {
      var acc=this.account
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(this.web3Provider);
      paymentContract.deployed().then(function(instance) {
          return instance.addProduct(title,data,{
            from: acc,
            value:100
          });
        }).then(function(status) {
          if(status) {
            return resolve({status:true});
          }
        }).catch(function(error){
        
          return reject('AddProduct');
        });
    });
    return promises;
  }
  async addReview(prname:any,rating,hash1,hash2) {
    await this.getAccountInfo().then((data2:any)=>{
      this.account = data2.fromAccount
    });
    window.ethereum.autoRefreshOnNetworkChange = false;
    var state;
    await this.checkUser(prname).then(data=>{
      state = data;
      console.log(state)
    })
    var promises =await new Promise((resolve, reject) => {
      console.log(state)
    if(!state){
      console.log('add')
      var acc = this.account
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(this.web3Provider);
      paymentContract.deployed().then(function(instance) {
          return instance.addReview(prname,hash1,hash2,rating,{
              from: acc,
              value:0
          })
        }).then(function(status) {
          if(status) {
            return resolve('success');
          }
        }).catch(function(error){
          this.error.openDialog(error);
          this.route.navigate(['/view-product',{queryParams:{name:prname}}]);
          return reject('AddReview');
        });
      }
      else{
        this.error.openDialog('You Have Already Added Review');
        this.route.navigate(['/dashboard']);
      }
    });
    return promises;
  }

  async checkUser(prname:string){
    var acc = this.account
   
    var promises =await new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(this.web3Provider);
      paymentContract.deployed().then(function(instance) {
          return instance.checkIfAlreadyReviewed(prname,{
            from : acc
          })
        }).then(function(status) {
            return resolve(status);
          }
        ).catch(function(error){
          return reject(error);
        });
    });
    return promises;
  }


  async getProductDetail(number:number){

    var promises =await new Promise((resolve, reject) => {
      var acc=this.account
      let paymentContract = TruffleContract(tokenAbi);
     
      paymentContract.setProvider(this.web3Provider);
      
      paymentContract.deployed().then(function(instance) {
          return instance.getProductHash(number);
        }).then(function(status) {
          if(status) {
            return resolve(status);
          }
        }).catch(function(error){
          return reject('ProductDetail');
        });
    });
    return promises;
  
  }



  async getProduct() {
    window.ethereum.autoRefreshOnNetworkChange = false;
    var promises =await new Promise((resolve, reject) => {
      
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(this.web3Provider);
      
      paymentContract.deployed().then(function(instance) {
          return instance.getProducts()
        }).then(function(status) {
          var product = []
          status.forEach(element => {
            var result = "";
          for(var i = 0; i < element.length; ++i){
            result+= (String.fromCharCode(element[i]));
          }
          product.push(result);
          });
          if(product) {
            return resolve(product);
          }
        }).catch(function(error){
          return reject('AllProduct');
        });
    });
    return promises;
  }
}