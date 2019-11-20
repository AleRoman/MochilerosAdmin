import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesListComponent } from './actividades-list.component';

describe('ActividadesListComponent', () => {
  let component: ActividadesListComponent;
  let fixture: ComponentFixture<ActividadesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
