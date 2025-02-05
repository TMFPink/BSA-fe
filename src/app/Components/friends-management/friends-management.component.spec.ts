import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FriendsManagementComponent } from './friends-management.component';

describe('FriendsManagementComponent', () => {
  let component: FriendsManagementComponent;
  let fixture: ComponentFixture<FriendsManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FriendsManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FriendsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
