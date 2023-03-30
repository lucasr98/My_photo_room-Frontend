import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSubmitPcComponent } from './modal-submit-pc.component';

describe('ModalSubmitPcComponent', () => {
  let component: ModalSubmitPcComponent;
  let fixture: ComponentFixture<ModalSubmitPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSubmitPcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSubmitPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
