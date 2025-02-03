import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateBillComponent } from './create-bill.component';

describe('CreateBillComponent', () => {
  let component: CreateBillComponent;
  let fixture: ComponentFixture<CreateBillComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CreateBillComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
