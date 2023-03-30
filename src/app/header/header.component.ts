import { Component } from '@angular/core';
import { StatesService } from '../services/states.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public statesService: StatesService){}
  toHome(){
    this.statesService.initialHomeState()
    this.statesService.toUp();
  }
}
