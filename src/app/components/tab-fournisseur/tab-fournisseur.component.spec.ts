import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabFournisseurComponent } from './tab-fournisseur.component';

describe('TabFournisseurComponent', () => {
  let component: TabFournisseurComponent;
  let fixture: ComponentFixture<TabFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
