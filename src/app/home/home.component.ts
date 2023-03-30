import { Component } from '@angular/core';
import { StatesService } from '../services/states.service';
import { ApiRequestService } from '../services/api-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  
  constructor(private apiRequestService: ApiRequestService, public statesService: StatesService){}
  onScroll(){
    this.statesService.reloadAllSubmits();
  }

}