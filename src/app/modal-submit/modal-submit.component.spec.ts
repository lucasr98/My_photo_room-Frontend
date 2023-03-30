import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSubmitComponent } from './modal-submit.component';

describe('ModalSubmitComponent', () => {
  let component: ModalSubmitComponent;
  let fixture: ComponentFixture<ModalSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
