import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteriodComponent } from './steriod.component';

describe('SteriodComponent', () => {
  let component: SteriodComponent;
  let fixture: ComponentFixture<SteriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
