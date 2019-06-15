import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Location2Component } from './location2.component';

describe('Location2Component', () => {
  let component: Location2Component;
  let fixture: ComponentFixture<Location2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Location2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Location2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
