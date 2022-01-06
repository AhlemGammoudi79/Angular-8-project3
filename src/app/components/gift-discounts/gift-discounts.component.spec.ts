import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftDiscountsComponent } from './gift-discounts.component';

describe('GiftDiscountsComponent', () => {
  let component: GiftDiscountsComponent;
  let fixture: ComponentFixture<GiftDiscountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftDiscountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftDiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
