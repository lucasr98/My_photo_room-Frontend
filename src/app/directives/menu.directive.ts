import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { StatesService } from '../services/states.service';

@Directive({
  selector: '[appMenu]'
})
export class MenuDirective {

  constructor(private el: ElementRef, public statesService: StatesService) { }

  @Output() public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any){
    const clickInside = this.el.nativeElement.contains(target);
    if(!clickInside){
      this.clickOutside.emit(target);
    }
  }

  @HostListener('document:scroll')
  public scrollFunc(){
    if(this.statesService.menuDesplegable === true){
      this.statesService.setMenuDesplegable(false);
    }
  }

}
