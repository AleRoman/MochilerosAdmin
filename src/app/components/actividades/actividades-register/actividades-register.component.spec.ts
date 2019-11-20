import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesRegisterComponent } from './actividades-register.component';

describe('ActividadesRegisterComponent', () => {
  let component: ActividadesRegisterComponent;
  let fixture: ComponentFixture<ActividadesRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadesRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
