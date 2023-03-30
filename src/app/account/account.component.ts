import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StatesService } from '../services/states.service';
import { ApiRequestService } from '../services/api-request.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  account: any;
  password: string;
  imgUrl: any;
  deleteAccountAlert: boolean;

  constructor(
    public statesService: StatesService,
    private apiRequestService: ApiRequestService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.account = null;
    this.password = '';
    this.imgUrl = '';
    this.deleteAccountAlert = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.apiRequestService.getUserDB(params['user']).subscribe({
        next: (res) => {
          if (res.message) {
            this.account = res;
          }
          else{
            this.account = res;
            let password = '';
            for (let i = 0; i < res.password.length; i++) {
              password += '•';
            }
            this.password = password;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
    this.statesService.toUp();
  }

  postProfileCloudinary(event: any) {
    if (event.target.files.length > 0) {
      this.statesService.loadingWindow = true;

      console.log(event.target.files[0]);

      if (this.statesService.account.imgURL.length > 0) {
        this.deleteProfileCloudinary();
      }

      // Guarda la imágen en el backend
      const file = event.target.files[0];
      const imgData = new FormData();
      imgData.append('file', file);
      imgData.append('upload_preset', 'my_photo_room');
      imgData.append('cloud_name', 'dfrujr0bd');
      this.apiRequestService.postProfileCloudinary(imgData).subscribe({
        next: (res) => {
          console.log('Imágen subida exitosamente.');
          console.log(res);
          // Guarda la imágen en la base de datos
          const updateData = {
            user: this.statesService.account.user,
            image: res.secure_url,
            imgName: res.public_id,
          };
          console.log(updateData);
          this.apiRequestService.putProfileDB(updateData).subscribe({
            next: (res) => {
              console.log('Imágen cambiada exitosamente');
              event.target.value = '';

              // Actualizar datos
              this.putAccountLS(updateData.image, updateData.imgName);
            },
            error: (error) => {
              return console.log(error);
            },
          });
        },
        error: (error) => {
          return console.log(error);
        },
      });
    }
  }

  deleteProfileCloudinary() {
    // Eliminar imágen de la base de datos
    const updateData = {
      user: this.statesService.account.user,
      image: '',
      imgName: '',
    };
    this.apiRequestService.putProfileDB(updateData).subscribe({
      next: (res) => {
        // Eliminar imágen del backend
        console.log('Imágen de perfil eliminada de la base de datos');
        console.log(this.statesService.account);
        this.apiRequestService
          .deleteProfileCloudinary({
            imgName: this.statesService.account.imgID,
          })
          .subscribe({
            next: (res) => {
              // Actualizar datos
              this.putAccountLS('', '');
              console.log('Imágen de perfil eliminada del backend');
              console.log(res);
            },
            error: (error) => {
              return console.log(error);
            },
          });
      },
      error: (error) => {
        return console.log(error);
      },
    });
  }

  putAccountLS(image: string, imageName: string) {
    this.statesService.account.imgURL = image;
    this.statesService.account.imgID = imageName;
    localStorage.setItem('account', JSON.stringify(this.statesService.account));
    this.statesService.getAccountLS();
    this.statesService.reloadAllSubmits();
    this.statesService.loadingWindow = false;
  }

  eliminarCuenta() {
    this.statesService.loadingWindow = true;
    this.apiRequestService
      .deleteAccountDB(this.statesService.account.user)
      .subscribe({
        next: (res) => {
          this.apiRequestService
            .deleteSubmitsDB(this.statesService.account.user)
            .subscribe({
              next: (res) => {
                console.log(res);
                const arrayImages = res.toString();
                console.log(arrayImages);
                const jsonImages = {
                  imgName: res,
                };
                console.log(jsonImages);
                this.apiRequestService.deleteSubmitsCloudinary(res).subscribe({
                  next: (res) => {
                    console.log(res);
                    if (this.statesService.account.imgURL.length === 0) {
                      return this.deleteAccount();
                    }
                    this.apiRequestService
                      .deleteProfileCloudinary({
                        imgName: this.statesService.account.imgID,
                      })
                      .subscribe({
                        next: (res) => {
                          this.deleteAccount();
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

  deleteAccount() {
    this.statesService.deleteAccountLS();
    this.statesService.initialHomeState();
    this.statesService.reloadAllSubmits();
    this.router.navigate(['/login']);
  }

  setDeleteAccountAlert(reference: boolean) {
    this.deleteAccountAlert = reference;
  }
}
