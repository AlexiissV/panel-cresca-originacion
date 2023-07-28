import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormgeneralesComponent } from './formgenerales.component';

describe('FormgeneralesComponent', () => {
  let component: FormgeneralesComponent;
  let fixture: ComponentFixture<FormgeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormgeneralesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormgeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
