import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { Iproduct } from '../models/iproduct';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-products',
  standalone:true,
  imports: [ CommonModule , ProductCardComponent , FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  searchTerm: string='';

  products: Iproduct[] = [];
  currentPage = 1;
  itemsPerPage = 3;

  constructor(private productService: ProductService) {
    this.products = this.productService.getAllProducts(); // ✅ جلب البيانات
  }

  get filteredProducts() {
    return this.products.filter(p =>
      p.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    const totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page;
    }
  }

  buyProduct(product: any) {
    console.log('اشتريت المنتج:', product);
  }
}
