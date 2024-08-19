import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagePopUpComponent } from './package-pop-up.component';

describe('PackagePopUpComponent', () => {
  let component: PackagePopUpComponent;
  let fixture: ComponentFixture<PackagePopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackagePopUpComponent]
    });
    fixture = TestBed.createComponent(PackagePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
