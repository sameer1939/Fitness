import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplimentComponent } from './suppliment.component';

describe('SupplimentComponent', () => {
  let component: SupplimentComponent;
  let fixture: ComponentFixture<SupplimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
