import { Component, OnInit } from '@angular/core';
import { StatesService } from './services/states.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public statesService: StatesService){}

  ngOnInit(): void {
    this.statesService.loadingWindow = true;
    this.statesService.getAccountLS();
    this.statesService.reloadAllSubmits()
    this.statesService.toUp();
  }

}
