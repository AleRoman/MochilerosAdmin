import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteRegisterComponent } from './restaurante-register.component';

describe('RestauranteRegisterComponent', () => {
  let component: RestauranteRegisterComponent;
  let fixture: ComponentFixture<RestauranteRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestauranteRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauranteRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
