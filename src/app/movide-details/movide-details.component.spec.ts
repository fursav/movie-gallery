import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovideDetailsComponent } from './movide-details.component';

describe('MovideDetailsComponent', () => {
  let component: MovideDetailsComponent;
  let fixture: ComponentFixture<MovideDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovideDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovideDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
