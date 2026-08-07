import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentClaims } from './recent-claims';

describe('RecentClaims', () => {
  let component: RecentClaims;
  let fixture: ComponentFixture<RecentClaims>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentClaims]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentClaims);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
