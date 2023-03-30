import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingWindowComponent } from './loading-window.component';

describe('LoadingWindowComponent', () => {
  let component: LoadingWindowComponent;
  let fixture: ComponentFixture<LoadingWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
