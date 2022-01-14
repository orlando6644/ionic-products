import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {


  id: number;
  data: Product;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService
  ) {
    this.data = new Product();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    this.apiService.getItem(this.id).subscribe((response:any) => {
      this.data = response.product;
    })
  }

  update() {
    this.apiService.updateItem(this.id, this.data).subscribe(response => {
      this.router.navigate(['dashboard']);
    })
  }

}
