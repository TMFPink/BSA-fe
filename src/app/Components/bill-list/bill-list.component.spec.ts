import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BillListComponent } from './bill-list.component';

describe('BillListComponent', () => {
  let component: BillListComponent;
  let fixture: ComponentFixture<BillListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BillListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
