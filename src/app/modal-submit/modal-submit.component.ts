import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatesService } from '../services/states.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiRequestService } from '../services/api-request.service';

@Component({
  selector: 'app-modal-submit',
  templateUrl: './modal-submit.component.html',
  styleUrls: ['./modal-submit.component.css'],
})
export class ModalSubmitComponent implements OnInit, OnDestroy {
  modalData: any;
  backUrl: string;
  userParam: string;

  constructor(
    public statesService: StatesService,
    private apiRequestService: ApiRequestService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    this.modalData = null;
    this.backUrl = '';
    this.userParam = '';
  }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    this.backUrl = url[1];
    this.userParam = url[2];
    // console.log(this.backUrl);
    // console.log(this.userParam);
    this.activatedRoute.params.subscribe((params) => {
      this.apiRequestService.getSubmitDB(params['image']).subscribe({
        next: (res) => {
          // console.log(res);
          if (res.message) {
            this.modalData = res;
            this.statesService.setScroll(true);
          } else {
            const modalData = res;
            this.apiRequestService.getProfileDB(this.userParam).subscribe({
              next: (res) => {
                console.log(res);
                if(res.message){
                  this.modalData = res;
                }
                else{
                  this.modalData = modalData;
                  this.modalData.userImg = res;
                }
                this.statesService.setScroll(true)
              },
              error: (error) => {
                console.log(error);
              },
            });
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.statesService.setScroll(false);
  }

  deleteSubmitRequest(id: number, imgName: string) {
    // console.log(id);
    // console.log(imgName);
    this.statesService.loadingWindow = true;
    this.apiRequestService.deleteSubmitDB(id).subscribe({
      next: (res) => {
        // console.log('Publicación eliminadas de la base de datos');
        this.apiRequestService
          .deleteSubmitCloudinary({ imgName: imgName })
          .subscribe({
            next: (res) => {
              this.statesService.initialHomeState();
              this.statesService.reloadAllSubmits();
              this.statesService.userGallery =
                this.statesService.userGallery.filter(
                  (publicacion: any) =>
                    publicacion !=
                    this.statesService.userGallery.filter(
                      (coincidencia: any) => coincidencia.imgID === imgName
                    )[0]
                );
              this.statesService.loadingWindow = false;
            },
            error: (error) => {
              console.log(error);
            },
          });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  closeModal(event: any) {
    if (event.target.id === 'closeModal' || event.target.id === 'closeIcon') {
      if (this.backUrl === 'account') {
        this.router.navigate([`/account/${this.userParam}`]);
      } else {
        this.router.navigate([`..`]);
      }
    }
  }
}
