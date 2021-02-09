import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFileComponent } from './review-file.component';

describe('ReviewFileComponent', () => {
  let component: ReviewFileComponent;
  let fixture: ComponentFixture<ReviewFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
