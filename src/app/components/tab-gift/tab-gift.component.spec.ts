import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGiftComponent } from './tab-gift.component';

describe('TabGiftComponent', () => {
  let component: TabGiftComponent;
  let fixture: ComponentFixture<TabGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
