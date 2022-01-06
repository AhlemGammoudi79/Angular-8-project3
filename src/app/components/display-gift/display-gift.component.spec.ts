import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayGiftComponent } from './display-gift.component';

describe('DisplayGiftComponent', () => {
  let component: DisplayGiftComponent;
  let fixture: ComponentFixture<DisplayGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
