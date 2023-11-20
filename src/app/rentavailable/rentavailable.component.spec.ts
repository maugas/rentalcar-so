import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentavailableComponent } from './rentavailable.component';

describe('RentavailableComponent', () => {
  let component: RentavailableComponent;
  let fixture: ComponentFixture<RentavailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentavailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
