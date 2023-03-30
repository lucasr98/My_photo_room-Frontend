import { Component, OnInit } from '@angular/core';
import { StatesService } from '../services/states.service';
import { ApiRequestService } from '../services/api-request.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css'],
})
export class SubmitComponent implements OnInit {
  formGroup!: FormGroup;
  imgURL: any;
  image: any;
  sendingForm: boolean;

  constructor(
    public statesService: StatesService,
    public apiRequestService: ApiRequestService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
    this.imgURL = 'assets/images/add_image.svg';
    this.image = null;
    this.sendingForm = false;
  }

  get invalidTitle() {
    return (
      this.formGroup.get('title')?.invalid &&
      this.formGroup.get('title')?.touched
    );
  }

  get invalidContent() {
    return (
      this.formGroup.get('content')?.invalid &&
      this.formGroup.get('content')?.touched
    );
  }

  ngOnInit(): void {
    this.statesService.toUp();
  }

  createForm() {
    this.formGroup = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(100),
        ],
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  setImgURL(event: any) {
    if (event.target.files.length > 0) {
      // Muestra en tiempo real los cambios
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.imgURL = event.target.result;
      };
      this.image = file;
      console.log(this.image);
    }
  }

  onSubmit() {
    console.log(this.formGroup);

    if (this.formGroup.invalid) {
      return Object.values(this.formGroup.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }

    if (this.image) {
      this.addSubmit();
    }
  }

  addSubmit(): boolean {
    if (this.sendingForm === false) {
      this.statesService.loadingWindow = true;
      this.sendingForm = true;

      // Toda esta porción de código sirve para agregar al nombre del archivo la fecha en la que fue creado
      const date = new Date();

      const getMonth = () => {
        const month = date.getMonth() + 1;
        return month < 10 ? `0${month}` : `${month}`;
      };
      const getDay = () => {
        const day = date.getDate();
        return day < 10 ? `0${day}` : `${day}`;
      };
      const getHour = () => {
        const hour = date.getHours();
        return hour < 10 ? `0${hour}` : `${hour}`;
      };
      const getMinute = () => {
        const minute = date.getMinutes();
        return minute < 10 ? `0${minute}` : `${minute}`;
      };
      const getSeconds = () => {
        const seconds = date.getSeconds();
        return seconds < 10 ? `0${seconds}` : `${seconds}`;
      };

      const fullDate =
        `${date.getFullYear()}` +
        getMonth() +
        getDay() +
        getHour() +
        getMinute() +
        getSeconds();

      /*
    const formData = {
      user: this.statesService.account.user,
      date: fullDate
    }
    */
      // Toda esta porción de código sirve para agregar al nombre del archivo la fecha en la que fue creado

      const imgData = new FormData();
      imgData.append('file', this.image);
      imgData.append('upload_preset', 'my_photo_room');
      imgData.append('cloud_name', 'dfrujr0bd');

      // SOLICITUD: Para guardar imágen de perfil (backend)
      this.apiRequestService.postSubmitCloudinary(imgData).subscribe({
        next: (res) => {
          console.log(res);
          const submitData = {
            userRef: this.statesService.account.user,
            title: this.formGroup.value.title,
            content: this.formGroup.value.content,
            image: res.public_id,
            url: res.secure_url,
            date: fullDate,
          };
          console.log(submitData);
          // SOLICITUD: Para guardar imágen de perfil (base de datos)
          this.apiRequestService.postSubmitDB(submitData).subscribe({
            next: (res) => {
              console.log(res);
              this.statesService.initialHomeState();
              this.statesService.reloadAllSubmits();
              this.router.navigate([
                `/account/${this.statesService.account.user}`,
              ]);
              this.statesService.loadingWindow = false;
              this.sendingForm = false;
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

      /*
    this.apiRequestService.postSubmitBE(imgData, formData).subscribe({
      next: (res)=>{
        const submitData = {
          userRef: this.statesService.account.user,
          userImg: this.statesService.account.image,
          title: this.formGroup.value.title,
          content: this.formGroup.value.content,
          image: `${fullDate}__${this.statesService.account.user}__${this.image.name}`,
          date: fullDate
        }
        // console.log(submitData);
        this.apiRequestService.postSubmitDB(submitData).subscribe({
          next: (res)=>{
            // console.log(res);
            this.statesService.initialHomeState();
            this.statesService.reloadAllSubmits();
            this.router.navigate([`/account/${this.statesService.account.user}`]);
          },
          error: (error)=>{
            return console.log(error);
          }
        })
      },
      error: (error)=>{
        return console.log(error);
      }
    });
    */
    }

    return false;
  }
}
