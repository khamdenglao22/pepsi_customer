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
  submitStatus :boolean = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private service: CartService
  ) {}

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.store_id = String(params.get('store_id'));
      this.loadData();
    });
  }

  loadData() {
    this.service.findCarts(this.lang, this.store_id).subscribe((res: any) => {
      this.dataCart = res;
      console.log(res);
      console.log(this.dataCart.details.length);
    });
  }

  formatCurrency(data: number) {
    return Number(data).toLocaleString();
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
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
    this.router.navigate(['/reward']);
  }
}
