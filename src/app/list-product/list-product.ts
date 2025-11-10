import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/product';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { ServiceApi } from '../serviceApi';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-product',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './list-product.html',
  styleUrl: './list-product.css',
  standalone: true
})

export class ListProduct implements OnInit {

  listeProduct$!: Observable<Product[]>;
  search! : FormGroup;
 
  constructor(private service : ServiceApi, private fb : FormBuilder) {
      this.search = this.fb.nonNullable.group({
      name: [''],
      id: [''],
      summary: [''],
      price: 0
    });
  }
  
  ngOnInit(): void {
    this.listeProduct$ = this.getAllProducts()
  }

  private getAllProducts(): Observable<Product[]> {
    const sourceProducts$ = this.service.getAllProducts();
    
    const searchName$ = combineLatest([
      this.search.controls['id'].valueChanges.pipe(startWith('')),
      this.search.controls['name'].valueChanges.pipe(startWith('')),
      this.search.controls['summary'].valueChanges.pipe(startWith('')),
      this.search.controls['price'].valueChanges.pipe(startWith(0)),
    ]) 
    
    return combineLatest([sourceProducts$, searchName$])
      .pipe(
        map(([products, [id, name, summary, price]]) => products.filter(prod =>{
          const isIdMatching = prod.id?.toLocaleLowerCase().includes(id.toLocaleLowerCase())
          const isNameMatching = prod.name?.toLocaleLowerCase().includes(name.toLocaleLowerCase());
          const isSummaryMatching = prod.summary?.toLocaleLowerCase().includes(summary.toLocaleLowerCase());
          const isPriceMatching = !price ||prod.price == price;        

          return isIdMatching && isNameMatching && isSummaryMatching && isPriceMatching;
        }))
      )

  }


}
