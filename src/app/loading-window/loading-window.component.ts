import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatesService } from '../services/states.service';

@Component({
  selector: 'app-loading-window',
  templateUrl: './loading-window.component.html',
  styleUrls: ['./loading-window.component.css']
})
export class LoadingWindowComponent implements OnInit, OnDestroy {
  constructor(public statesService: StatesService){}
  ngOnInit(): void {
    this.statesService.setScroll(true);
  }
  ngOnDestroy(): void {
    this.statesService.setScroll(false);
  }
}
