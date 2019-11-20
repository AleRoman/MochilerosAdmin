import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteEditarComponent } from './restaurante-editar.component';

describe('RestauranteEditarComponent', () => {
  let component: RestauranteEditarComponent;
  let fixture: ComponentFixture<RestauranteEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestauranteEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauranteEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
