import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CartService } from './cart.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  url = environment.imgUrl;
  store_id: any;
  lang: any;

  imagePreview: string | null = null;

  dataCart: any;
  submitStatus: boolean = false;

  gameId: any;

  paymentRef: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private service: CartService
  ) {}

  ngOnInit(): void {
    // console.log(this.fileInput);
    this.lang = localStorage.getItem('lang');
    this.route.queryParamMap.subscribe((params) => {
      this.store_id = params.get('store_id');
      this.loadData();
    });
  }

  loadData() {
    this.service.findCarts(this.lang, this.store_id).subscribe((res: any) => {
      this.dataCart = res;
      // console.log(res);
      // console.log(this.dataCart.details.length);
    });
  }

  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }

  triggerFileInput(event: any): void {
    event.preventDefault();
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.paymentRef = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };

      reader.readAsDataURL(this.paymentRef);
    }
  }

  deleteShowImage() {
    this.imagePreview = '';
  }

  updateCart(updateData: any, qty: any) {
    const data = {
      product_id: updateData.product.id,
      qty: updateData.qty + qty,
    };
    // console.log(data);
    if (data.qty == 0) {
      this.deleteItem(data.product_id);
      return;
    }
    this.service.updateCarts(data).subscribe(
      (res: any) => {
        this.loadData();
      },
      (error: any) => {
        this.snackBar.open(error.msg, '', {
          verticalPosition: 'top',
          duration: 2000,
        });
      }
    );
  }

  deleteItem(id: number | null) {
    // console.log(id);
    this.service.delateCarts(id).subscribe((res: any) => {
      this.loadData();
    });
  }

  onSubmit() {
    this.submitStatus = true;
    let formatImg = new FormData();
    formatImg.append('payment_ref', this.paymentRef);
    this.service.createOrder(formatImg).subscribe(
      (res: any) => {
        this.submitStatus = false;

        // console.log(res.game);

        if (res.status === 200) {
          this.router.navigate(['/reward', res.game.game_id], {
            queryParams: {
              store_id: this.store_id,
              max_play_times: res.game.max_play_times,
            },
          });
        }
      },

      (err: any) => {
        // console.log(err);
        this.submitStatus = false;
        this.snackBar.open(err.msg, '', {
          verticalPosition: 'top',
          duration: 2000,
        });
      }
    );
  }
}
