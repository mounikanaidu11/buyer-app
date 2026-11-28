import { Component } from '@angular/core';
import { WelcomeBanner } from '../../../shared/components/welcome-banner/welcome-banner';

@Component({
  imports: [WelcomeBanner],
  selector: 'app-product-list',
  styleUrl: './product-list.scss',
  templateUrl: './product-list.html',
})
export class ProductList {}
