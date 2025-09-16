import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Icategory } from '../../models/icategory';
import { enDressStyle, enSize, Iproduct } from '../../models/iproduct';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [FormsModule, NgClass, NgFor],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  lowPrice!: number;
  highPrice!: number;
  ourCategories: Icategory[];
  enSize = enSize;
  sizes = Object.keys(enSize)
    .filter(k => isNaN(Number(k)))
    .map(k => ({
      key: k,
      value: enSize[k as keyof typeof enSize]
    }));

  enstyle = enDressStyle;
  styles = Object.keys(enDressStyle)
    .filter(k => isNaN(Number(k)))
    .map(k => ({
      key: k,
      value: enDressStyle[k as keyof typeof enDressStyle]
    }));

  colors = [
    { name: 'Red', value: '#dc3545' },
    { name: 'Blue', value: '#0d6efd' },
    { name: 'Green', value: '#198754' },
    { name: 'Purple', value: '#e207ffff' },
    { name: 'Gray', value: '#6c757d' },
    { name: 'White', value: '#ffffff' },
    { name: 'Black', value: '#000000' },
  ];

  selectedColor: string = '#ffffff';

  products!: Iproduct[];
  numberOfTotalProducts: number = 0;
  selectedCategoryId: number = 0;
  selectedStyleId: number = 0;
  selectedSize: enSize | null = null;
  selectedPrice!: number;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.ourCategories = categoryService.getCategories();
  }

  ngOnInit(): void {
    const lowHighPrice = this.productService.lowHighPrice();
    this.lowPrice = lowHighPrice.lowestPrice;
    this.highPrice = lowHighPrice.heightestPrice;
    this.selectedPrice = this.lowPrice;

    const result = this.productService.getPaginated(1);
    this.products = result.products;
    this.numberOfTotalProducts = result.numberOfProducts;
  }

  sortByLowPrice() {
    const result = this.productService.getPaginated(1);
    this.products = result.products;
  }

  sortByHighPrice() {
    const result = this.productService.getPaginated(1);
    this.products = result.products;
  }

  sortByLowDiscount() {
    const result = this.productService.getPaginated(1, 2);
    this.products = result.products;
  }

  applyFilter() {
    // تحويل selectedStyleId إلى 0 أو enDressStyle بشكل آمن
    let styleFilter: 0 | enDressStyle = 0;
    if (this.selectedStyleId in enDressStyle) {
      styleFilter = this.selectedStyleId as unknown as enDressStyle;
    }

    const result = this.productService.applyFilter(
      this.selectedCategoryId,
      styleFilter,
      this.selectedSize,
      this.selectedPrice,
      this.selectedColor
    );

    this.products = result;
  }

  selectSize(size: enSize) {
    this.selectedSize = size;
  }
}
