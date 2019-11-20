import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelesListComponent } from './hoteles-list.component';

describe('HotelesListComponent', () => {
  let component: HotelesListComponent;
  let fixture: ComponentFixture<HotelesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
