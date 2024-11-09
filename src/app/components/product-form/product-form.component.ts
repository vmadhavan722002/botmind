import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProductService } from '../../services/product.service';
import { MessageService } from 'primeng/api';  // Import MessageService

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule
  ],
  providers: [MessageService],  // Add MessageService to providers
  template: `
    <div class="card">
      <h2 class="text-primary font-bold mb-4">{{isEditMode ? 'Edit' : 'Add'}} Product</h2>
      
      <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="flex flex-column gap-3">
        <div class="field">
          <label for="title" class="font-bold block mb-2">Product Name</label>
          <input pInputText id="title" formControlName="title" class="w-full"/>
        </div>

        <div class="field">
          <label for="price" class="font-bold block mb-2">Price (USD)</label>
          <p-inputNumber id="price" formControlName="price" mode="currency" currency="USD" 
                        [min]="0" class="w-full"></p-inputNumber>
        </div>

        <div class="field">
          <label for="category" class="font-bold block mb-2">Category</label>
          <input pInputText id="category" formControlName="category" class="w-full"/>
        </div>

        <div class="field">
          <label for="description" class="font-bold block mb-2">Description</label>
          <textarea pInputTextarea id="description" formControlName="description" 
                    [rows]="5" class="w-full"></textarea>
        </div>

        <div class="field">
          <label for="stock" class="font-bold block mb-2">Stock</label>
          <p-inputNumber id="stock" formControlName="stock" [min]="0" class="w-full">
          </p-inputNumber>
        </div>

        <div class="flex justify-content-end gap-2 mt-4">
          <button pButton type="button" label="Cancel" class="p-button-secondary" 
                  (click)="router.navigate(['/'])"></button>
          <button pButton type="submit" label="Save" [disabled]="!productForm.valid">
          </button>
        </div>
      </form>
    </div>
  `
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private productService: ProductService,
    private messageService: MessageService  // Inject MessageService
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = params['id'];
        this.loadProduct(this.productId!);
      }
    });
  }

  loadProduct(id: number): void {
    this.productService.getProduct(id).subscribe(product => {
      this.productForm.patchValue(product);
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      
      if (this.isEditMode && this.productId) {
        this.productService.updateProduct(this.productId, productData)
          .subscribe(() => {
            this.showSuccess('Product updated successfully');
            this.router.navigate(['/']);
          }, () => this.showError('Failed to update product'));
      } else {
        this.productService.addProduct(productData)
          .subscribe(() => {
            this.showSuccess('Product added successfully');
            this.router.navigate(['/']);
          }, () => this.showError('Failed to add product'));
      }
    }
  }

  private showSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  private showError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
