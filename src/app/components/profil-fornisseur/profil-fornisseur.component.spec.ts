import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilFornisseurComponent } from './profil-fornisseur.component';

describe('ProfilFornisseurComponent', () => {
  let component: ProfilFornisseurComponent;
  let fixture: ComponentFixture<ProfilFornisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilFornisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilFornisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
