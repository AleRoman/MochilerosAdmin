import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesEditComponent } from './actividades-edit.component';

describe('ActividadesEditComponent', () => {
  let component: ActividadesEditComponent;
  let fixture: ComponentFixture<ActividadesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
