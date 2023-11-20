import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentbookingComponent } from './rentbooking.component';

describe('RentbookingComponent', () => {
  let component: RentbookingComponent;
  let fixture: ComponentFixture<RentbookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentbookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
