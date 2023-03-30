import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  account: any;
  homeSubmits: any;
  contador: number;
  existsSubmits: boolean;

  userGallery: any;

  loadingWindow: boolean;

  menuDesplegable: boolean;

  constructor(private apiRequestService: ApiRequestService) {
    this.homeSubmits = [];
    this.contador = 0;
    this.existsSubmits = true;

    this.userGallery = [];

    this.loadingWindow = false;

    this.menuDesplegable = false;
  }

  reloadAllSubmits() {
    this.apiRequestService.getAllSubmitsDB(this.contador).subscribe({
      next: (res) => {
        if (res.length !== 0) {
          this.homeSubmits.push(...res);
          // console.log(this.homeSubmits)
          for (let i = 0; i < this.homeSubmits.length; i++) {
            this.apiRequestService
              .getProfileDB(this.homeSubmits[i].userRef)
              .subscribe({
                next: (res) => {
                  this.homeSubmits[i].userImg = res;
                },
                error: (error) => {
                  console.log(error);
                },
              });
          }
          this.loadingWindow = false;
          console.log(this.homeSubmits);
        } else {
          this.existsSubmits = false;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.contador = this.contador + 1;
  }

  getAccountLS() {
    let data: any = localStorage.getItem('account');
    this.account = JSON.parse(data);
  }

  deleteAccountLS() {
    this.account = null;
    localStorage.removeItem('account');
  }

  initialHomeState() {
    this.homeSubmits = [];
    this.contador = 0;
    this.existsSubmits = true;
    return this.reloadAllSubmits();
  }

  setMenuDesplegable(reference: boolean) {
    if (this.menuDesplegable === true) {
      this.menuDesplegable = false;
    } else {
      this.menuDesplegable = reference;
    }
  }

  toUp() {
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    }, 500);
  }

  setScroll(reference: boolean) {
    if (reference === true) {
      var x = window.scrollX;
      var y = window.scrollY;
      window.onscroll = function () {
        window.scrollTo(x, y);
      };
    } else {
      window.onscroll = null;
    }
  }

}
