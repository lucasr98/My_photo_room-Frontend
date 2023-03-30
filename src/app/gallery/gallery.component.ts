import { Component, OnInit } from '@angular/core';
import { StatesService } from '../services/states.service';
import { ApiRequestService } from '../services/api-request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  contador: number;
  existSubmits: boolean;
  url: string;
  loadingSpinner: boolean;

  constructor(
    private apiRequestService: ApiRequestService,
    public statesService: StatesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.contador = 0;
    this.existSubmits = true;
    this.url = '';
    this.loadingSpinner = false;
  }

  ngOnInit(): void {
    this.getSubmitsRequest();
  }

  getSubmitsRequest() {
    this.activatedRoute.params.subscribe((params) => {
      if(this.url !== params["user"]){
        this.existSubmits = true;
        this.contador = 0;
        this.statesService.userGallery = [];
        this.url = params["user"];
      }
      if (this.existSubmits === true) {
        this.loadingSpinner = true;
        this.apiRequestService
          .getSubmitsDB(params['user'], this.contador)
          .subscribe({
            next: (res) => {
              console.log(res.length);
              if (res.length !== 0) {
                this.statesService.userGallery.push(...res);
                console.log(this.statesService.userGallery);
              } else {
                this.existSubmits = false;
              }
              this.loadingSpinner = false;
            },
            error: (error) => {
              console.log(error);
            },
          });
        this.contador = this.contador + 1;
      }
    });
  }
}
