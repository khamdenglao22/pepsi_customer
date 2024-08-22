import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeService } from './home.service';
import { environment } from 'src/environments/environment.development';
import { CartService } from '../cart/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  url = environment.imgUrl;
  lang: any;
  pageNumber: number = 1;
  pageSize: number = 10;

  store_id: any;
  // store_id_storage: any;
  dataStores: any;
  dataProducts: Array<any> = [];
  dataCart: Array<any> = [];

  constructor(
    private snackBar: MatSnackBar,
    private service: HomeService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');

    this.route.queryParamMap.subscribe((params) => {
      this.store_id = params.get('store_id');
    });

    // console.log(this.store_id_storage);

    this.service.findStores(this.lang, this.store_id).subscribe((res: any) => {
      this.dataStores = res;
      // console.log(this.dataStores.id);
      // console.log(res.id);
      // this.store_id = res.id;
      this.findQtyProduct();

      this.service
        .findProducts(this.lang, res.id, this.pageNumber, this.pageSize)
        .subscribe((res: any) => {
          this.dataProducts = res.data;
          // console.log(res);
        });
    });
  }

  findQtyProduct() {
    this.cartService
      .findCarts(this.lang, this.store_id)
      .subscribe((res: any) => {
        this.dataCart = res.details;
        // console.log(res);
      });
  }

  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }

  addToCart(id: number | null) {
    const data = {
      product_id: id,
      qty: 1,
      store_id: this.store_id,
    };
    this.cartService.addCarts(data).subscribe((res: any) => {
      // console.log(res);
      this.findQtyProduct();
    });
  }
}
