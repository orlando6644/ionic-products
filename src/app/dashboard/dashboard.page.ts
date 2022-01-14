import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

  productsData: any;

  userDetail: string;

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    public apiService: ApiService
  ) {
    this.productsData = [];
   }

  ngOnInit() {
    this.ionicAuthService.userDetails().subscribe(response => {
      if (response !== null) {
        this.userDetail = response.email;
      } else {
        this.router.navigateByUrl('');
      }
    }, error => {
      console.log(error);
    })
  }

  ionViewWillEnter() {

    this.getAllProducts();
  }

  getAllProducts() {
    //Get saved list of products
    this.apiService.getList().subscribe((response :any) => {
      console.log(response.products,'esto es');
      this.productsData = response.products;
    })
  }


  signOut() {
    this.ionicAuthService.signoutUser()
      .then(res => {
        this.router.navigateByUrl('login');
      })
      .catch(error => {
        console.log(error);
      })
  }
}
