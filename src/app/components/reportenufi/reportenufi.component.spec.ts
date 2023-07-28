import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportenufiComponent } from './reportenufi.component';

describe('ReportenufiComponent', () => {
  let component: ReportenufiComponent;
  let fixture: ComponentFixture<ReportenufiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportenufiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportenufiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
