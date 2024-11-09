import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  template: `
    <div class="navbar w-full p-3 surface-card shadow-5 flex justify-content-between align-items-center">
      <div class="flex align-items-center gap-2">
        <i class="pi pi-shopping-cart text-2xl text-primary"></i>
        <span class="text-2xl font-bold text-primary">Product Hub</span>
      </div>
      <div class="flex gap-2">
        <button pButton icon="pi pi-home" label="Home" 
                class="p-button-text" routerLink="/"></button>
        <button pButton icon="pi pi-plus" label="Add Product" 
                class="p-button-primary" routerLink="/product/create"></button>
      </div>
    </div>
  `
})
export class NavbarComponent {}