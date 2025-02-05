import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FriendsAddingComponent } from './friends-adding.component';

describe('FriendsAddingComponent', () => {
  let component: FriendsAddingComponent;
  let fixture: ComponentFixture<FriendsAddingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FriendsAddingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FriendsAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
