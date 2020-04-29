import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChildComponent } from './single-child.component';

describe('SingleChildComponent', () => {
  let component: SingleChildComponent;
  let fixture: ComponentFixture<SingleChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
