import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/add-product', title: 'Add Place',  icon:'content_paste', class: '' },
    { path: '/show-products', title: 'All Places',  icon:'library_books', class: '' },
    {path:'/view-product',title:'Place Details',icon:'library_books',class:''},
    {path:'/test',title:'test',icon:'library_books',class:''},
    {path:'/view-review',title:'All Reviews',icon:'library_books',class:''},
    {path:'/add-review',title:'Add Reviews',icon:'library_books',class:''},
    {path:'/user-data',title:'User Profile',icon:'library_books',class:''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
}
