
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.page.html',
  styleUrls: ['./product-create.page.scss'],
})
export class ProductCreatePage implements OnInit {

  data: Product

  constructor(
    public apiService: ApiService,
    public router: Router
  ) {
    this.data = new Product();
  }

  ngOnInit() {
  }

  submitForm() {
    this.apiService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['dashboard']);
    });

  }

}
