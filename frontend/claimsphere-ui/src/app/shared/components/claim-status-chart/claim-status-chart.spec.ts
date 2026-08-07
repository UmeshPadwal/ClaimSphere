import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimStatusChart } from './claim-status-chart';

describe('ClaimStatusChart', () => {
  let component: ClaimStatusChart;
  let fixture: ComponentFixture<ClaimStatusChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimStatusChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimStatusChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
