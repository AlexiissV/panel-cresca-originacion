import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessetPassComponent } from './resset-pass.component';

describe('RessetPassComponent', () => {
  let component: RessetPassComponent;
  let fixture: ComponentFixture<RessetPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RessetPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RessetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
