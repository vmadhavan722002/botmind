import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/create', component: ProductFormComponent },
  { path: 'product', component: ProductFormComponent }  // This will handle ?id=1 for editing
];