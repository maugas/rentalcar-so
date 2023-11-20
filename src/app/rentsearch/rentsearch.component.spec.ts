import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentsearchComponent } from './rentsearch.component';

describe('RentsearchComponent', () => {
  let component: RentsearchComponent;
  let fixture: ComponentFixture<RentsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentsearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
