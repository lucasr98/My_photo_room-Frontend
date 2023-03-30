import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-submit-pc',
  templateUrl: './modal-submit-pc.component.html',
  styleUrls: ['./modal-submit-pc.component.css']
})
export class ModalSubmitPcComponent {
  @Input() statesService: any;
  @Input() modalData: any;
  @Input() backUrl: any;
  @Input() closeModal: any;
  @Input() deleteSubmitRequest: any;
}
