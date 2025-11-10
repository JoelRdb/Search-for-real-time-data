import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Test } from './test/test';
import { ListProduct } from "./list-product/list-product";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Test,
    ListProduct
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('learnAngular');
}
