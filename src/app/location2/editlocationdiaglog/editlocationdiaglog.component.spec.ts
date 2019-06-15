import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlocationdiaglogComponent } from './editlocationdiaglog.component';

describe('EditlocationdiaglogComponent', () => {
  let component: EditlocationdiaglogComponent;
  let fixture: ComponentFixture<EditlocationdiaglogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditlocationdiaglogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlocationdiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
