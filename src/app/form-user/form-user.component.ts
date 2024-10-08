import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormUserService } from './form-user.service';

interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent {
  village: boolean = false;
  submitStatus: boolean = false;
  lang: any;

  dataProvinces: Array<any> = [];
  dataDistricts: Array<any> = [];
  dataVillages: Array<any> = [];

  fullname: string = '';
  gender: string = '';
  dobDay: string = '';
  dobMon: string = '';
  dobYear: string = '';
  province_id: string = '';
  district_id: string = '';
  village_id: string = '';
  village_name: string = '';

  store_id: any;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private service: FormUserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    this.service.findProvinces(this.lang).subscribe((res: any) => {
      this.dataProvinces = res.data;
      // console.log(res.data);
    });

    this.route.queryParamMap.subscribe((params) => {
      this.store_id = params.get('store_id');
    });
  }

  onAddVillage() {
    this.village = !this.village;
    this.village_id = '';
    this.village_name = '';
  }

  onChange(e: any) {
    console.log(e.target.value);
  }

  onProvincesChange() {
    this.dataDistricts = [];
    this.service
      .findDistricts(this.lang, this.province_id)
      .subscribe((res: any) => {
        this.dataDistricts = res.data;
      });
  }

  onDistrictsChange() {
    this.dataVillages = [];
    this.service
      .findVillages(this.lang, this.province_id, this.district_id)
      .subscribe((res: any) => {
        this.dataVillages = res.data;
      });
  }

  submit() {
    if (this.fullname == '') {
      return;
    }

    if (this.gender == '') {
      return;
    }

    if (this.dobDay == '') {
      return;
    }

    if (this.dobMon == '') {
      return;
    }

    if (this.dobYear == '') {
      return;
    }

    if (this.province_id == '') {
      return;
    }

    if (this.district_id == '') {
      return;
    }
    if (this.village_id == '' && this.village_name == '') {
      return;
    }

    const data = {
      fullname: this.fullname,
      gender: this.gender,
      dob: this.dobYear + '-' + this.dobMon + '-' + this.dobDay,
      province_id: this.province_id,
      district_id: this.district_id,
      village_id: this.village_id == '' ? null : this.village_id,
      village_name: this.village_name == '' ? null : this.village_name,
    };
    this.submitStatus = true;
    // console.log(data);
    this.service.updateProfile(data).subscribe(
      (res: any) => {
        this.submitStatus = false;
        if (res.status == 200) {
          this.router.navigate(['/'], {
            queryParams: {
              store_id: this.store_id,
            },
          });
        }
      },
      (error: any) => {
        this.submitStatus = false;
        console.log(error);
      }
    );
  }
}
