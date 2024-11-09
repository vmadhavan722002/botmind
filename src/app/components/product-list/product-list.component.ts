import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../services/product.service';
import { UsdToInrPipe } from '../../pipes/usd-to-inr.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonModule, UsdToInrPipe],
  template: `
    <div class="card">
      <div class="flex justify-content-between align-items-center mb-4">
        <h2 class="m-0 text-primary font-bold">Products</h2>
        <button pButton label="Add New Product" icon="pi pi-plus" 
                (click)="router.navigate(['/product/create'])"
                class="p-button-primary"></button>
      </div>

      <p-table [value]="products" [paginator]="true" [rows]="10"
               styleClass="p-datatable-gridlines p-datatable-striped"
               [showCurrentPageReport]="true" responsiveLayout="scroll">
        <ng-template pTemplate="header">
          <tr>
            <th>Name</th>
            <th>Price (INR)</th>
            <th>Category</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
          <tr>
            <td>{{product.title}}</td>
            <td>₹{{product.price | usdToInr | number:'1.2-2'}}</td>
            <td>{{product.category}}</td>
            <td>{{product.description}}</td>
            <td>{{product.stock}}</td>
            <td>
              <button pButton icon="pi pi-pencil" 
                      class="p-button-rounded p-button-primary p-button-sm"
                      (click)="editProduct(product.id)"></button>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.products;
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/product'], { queryParams: { id } });
  }
}