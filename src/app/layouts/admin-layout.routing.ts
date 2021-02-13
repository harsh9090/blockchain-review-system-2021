import { Routes } from '@angular/router';
import { Error404Component } from 'app/error404/error404.component';
import { AddNewProductComponent } from 'app/product/add-new-product/add-new-product.component';
import { AddedProductComponent } from 'app/product/added-product/added-product.component';
import { AddReviewComponent } from 'app/review/add-review/add-review.component';
import { ReviewFileComponent } from 'app/review/review-file/review-file.component';
import { UserDataComponent } from 'app/user-data/user-data.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ShowAllProductsComponent } from './show-all-products/show-all-products.component';
import { ViewProductComponent } from './view-product/view-product.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'add-product',  component: AddNewProductComponent },
    { path: 'show-products',  component: ShowAllProductsComponent },
    {path: 'added-product',component:AddedProductComponent},
    {path:'view-product',component:ViewProductComponent},
    {path:'view-review',component:ReviewFileComponent},
    {path:'add-review',component:AddReviewComponent},
    {path:'error',component:Error404Component},
    {path:'user-data',component:UserDataComponent}
];
