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
      var err = this.error
      paymentContract.deployed().then(function(instance) {
          return instance.getProductReviewFile(productName)
        }).then(function(data) {
            return resolve(data);
        }).catch(function(error){
          err.openDialog('Error in fetching reviews')
          return reject('ReviewFile');
        });
    });
    return promises;
  }
  async getAccountInfo() {
    if (window.ethereum) {
    new Web3(window.ethereum);
      try {
       await window.ethereum.enable();
      } catch (error) {
      }
    }
    else if (window.web3) {
     await console.log('Injected web3 detected.');
      
    }
    else {
      const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
       new Web3(provider);
         
    }
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(function(err, account) {
        if(account == null){
          return reject('Account')
        }
        if(err === null) {
          window.web3.eth.getBalance(account, function(err, balance) {
            if(balance < 1000000000000000){
              return reject('Balance');
            }
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


  async getPoints(){
    await this.getAccountInfo().then((data2:any)=>{
      this.account = data2.fromAccount
    }).catch(e=>{
      console.log(e)
      // this.error.openDialog('you are not logged in to matamask')
    });
    var promises =await new Promise((resolve, reject) => {
      var acc=this.account
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(this.web3Provider);
      paymentContract.deployed().then(function(instance) {
          return instance.getPointsOfUser({
            from: acc
          });
        }).then(function(status) {
          if(status) {
            return resolve(status);
          }
        }).catch(function(error){
          this.error.openDialog('There is a problem in adding Review');
          this.route.navigate(['/add-product']);
          return reject('AddProduct');
        });
    });
    return promises;
  }

  async getReward(){
    await this.getAccountInfo().then((data2:any)=>{
      this.account = data2.fromAccount
    }).catch(e=>{
      console.log(e)
      // this.error.openDialog('you are not logged in to matamask')
    });
    var promises =await new Promise((resolve, reject) => {
      var acc=this.account
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(this.web3Provider);
      paymentContract.deployed().then(function(instance) {
          return instance.redeemPrice({
            from: acc
          });
        }).then(function(status) {
          console.log(status)
         var data = this.makeid()
         console.log(data)
          return data;
        }).catch(function(error){
          this.error.openDialog('There is a problem in getting rewards');
          this.route.navigate(['/add-product']);
          return reject('AddProduct');
        });
    });
    return promises;
  }

makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

  async addDetails(data:any,title:string) {
    await this.getAccountInfo().then((data2:any)=>{
      this.account = data2.fromAccount
    }).catch(e=>{
      this.error.openDialog('you are not logged in to matamask')
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
          this.error.openDialog('There is a problem in adding Review');
          this.route.navigate(['/add-product']);
          return reject('AddProduct');
        });
    });
    return promises;
  }

  async addReview(prname:any,rating,hash1,hash2) {
    var check=true;
    await this.getAccountInfo().then((data2:any)=>{
      this.account = data2.fromAccount
      if(this.account==null){
        this.error.openDialog('You are not logged in to Metamask.')
      }
    }).catch(e=>{
      check=false;
      if(e=='Balance'){
        this.error.openDialog('Low Balance in your account');
      }
      if(e=='Account'){
      this.error.openDialog('You are not logged in to system')
      }
      this.route.navigate(['/dashboard'])
      return;
    });
    if(!check){
      return;
    }
    var state=false;
    await this.checkUser(prname).then((data:boolean)=>{
      state = data;
    })
    var promises =await new Promise((resolve, reject) => {
    if(!state){
      var acc = this.account
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(this.web3Provider);
      var err = this.error
      var route = this.route
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
          
          err.openDialog(`There is some error in procedure
          Please try again...`);
          route.navigate(['show-products']); 
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

  async addUser(data:any){
    await this.getAccountInfo().then((data2:any)=>{
      this.account = data2.fromAccount
    }).catch(e=>{
      this.error.openDialog('you are not logged in to metamask')
    });
    var promises =await new Promise((resolve, reject) => {
      var acc=this.account
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(this.web3Provider);
      paymentContract.deployed().then(function(instance) {
          return instance.setUserProfile(data,{
            from: acc
          });
        }).then(function(status) {
            return resolve(status);
        }).catch(function(error){
          this.error.openDialog('There is a problem in adding details');
          return reject('AddProduct');
        });
    });
    return promises;
  }



  async getUserDetail(str:string){
    var error = this.error;
    var open = false;
    await this.getAccountInfo().then((data2:any)=>{
      this.account = data2.fromAccount
    }).catch(e=>{
      if(str!='main'){
      if(e == 'Account'){
        open=true;
      this.error.openDialog('Please login to metamask')
      }
    }
    });
    var promises =await new Promise((resolve, reject) => {
      var acc=this.account
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(this.web3Provider);
      paymentContract.deployed().then(function(instance) {
          return instance.getUserProfile({
            from: acc
          });
        }).then(function(status) {
          if(!status && str=='sec' && !open){
            error.editDetails();
          }
          else
            return resolve(status);
        }).catch(function(error){
          this.error.openDialog('There is a problem in getting details');
          return reject('AddProduct');
        });
    });
    return promises;
  }
  async totalReview(){
    var promises =await new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(this.web3Provider);
      paymentContract.deployed().then(function(instance) {
          return instance.totalReview()
        }).then(function(status) {
            return resolve(status.words[0]);
        }).catch(function(error){
          return reject('ProductDetail');
        });
    });
    return promises;
  
  }
  async totalProduct(){
    var promises =await new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(this.web3Provider);
      paymentContract.deployed().then(function(instance) {
          return instance.totalProduct()
        }).then(function(status) {
            return resolve(status.words[0]);
        }).catch(function(error){
          return reject('ProductDetail');
        });
    });
    return promises;
  
  }
  
  async getProductDetail(prname:string){
    var promises =await new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(this.web3Provider);
      paymentContract.deployed().then(function(instance) {
          return instance.getProductHash(prname);
        }).then(function(status) {
          if(status) {
            return resolve(status);
          }
        }).catch(function(error){
          this.error.openDialog(`Sorry for inconvience!
          there is some error in fatching details`);
        this.route.navigate(['/show-products']);
          return reject('ProductDetail');
        });
    });
    return promises;
  
  }

  async getLastProducts(){
      window.ethereum.autoRefreshOnNetworkChange = false;
      var promises =await new Promise((resolve, reject) => { 
        let paymentContract = TruffleContract(tokenAbi);
        paymentContract.setProvider(this.web3Provider);
        paymentContract.deployed().then(function(instance) {
            return instance.getLatest5Products()
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
            this.error.openDialog('You Have Already Added Review');
          this.route.navigate(['/dashboard']);
            return reject('AllProduct');
          });
      });
      return promises;
    }
    async getLastReviews(){
      window.ethereum.autoRefreshOnNetworkChange = false;
      var promises =await new Promise((resolve, reject) => { 
        let paymentContract = TruffleContract(tokenAbi);
        paymentContract.setProvider(this.web3Provider);
        paymentContract.deployed().then(function(instance) {
            return instance.getLatest5Reviews()
          }).then(function(status) {
            
            var product = [];
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
            this.error.openDialog('You Have Already Added Review');
          this.route.navigate(['/dashboard']);
            return reject('AllProduct');
          });
      });
      return promises;
    }

    async getUserReviewAll(){
      await this.getAccountInfo().then((data2:any)=>{
        this.account = data2.fromAccount
      }).catch(e=>{
      });
      var promises =await new Promise((resolve, reject) => {
        var acc=this.account
        let paymentContract = TruffleContract(tokenAbi);
        paymentContract.setProvider(this.web3Provider);
        paymentContract.deployed().then(function(instance) {
            return instance.getAllReviewsGivenByUser({
              from: acc
            });
          }).then(function(status) {
            var product = [];
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
              return resolve(status);
          }).catch(function(error){
            this.error.openDialog('There is a problem in adding details');
            return reject('AddProduct');
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
          this.error.openDialog('You Have Already Added Review');
        this.route.navigate(['/dashboard']);
          return reject('AllProduct');
        });
    });
    return promises;
  }
}