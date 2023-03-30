import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRequestService } from '../services/api-request.service';
import { StatesService } from '../services/states.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  formGroup!: FormGroup;
  invalidRegister: string;
  genreChecked: string;
  watchPassword: boolean;
  sendingForm: boolean;

  constructor(
    public statesService: StatesService,
    public apiRequestService: ApiRequestService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.invalidRegister = '';
    this.genreChecked = 'male';
    this.watchPassword = false;
    this.sendingForm = false;
  }

  get invalidUser() {
    return (
      this.formGroup.get('user')?.invalid && this.formGroup.get('user')?.touched
    );
  }
  get invalidPassword() {
    return (
      this.formGroup.get('password')?.invalid &&
      this.formGroup.get('password')?.touched
    );
  }
  get invalidEmail() {
    return (
      this.formGroup.get('email')?.invalid &&
      this.formGroup.get('email')?.touched
    );
  }
  get invalidName() {
    return (
      this.formGroup.get('name')?.invalid && this.formGroup.get('name')?.touched
    );
  }
  get invalidLastName() {
    return (
      this.formGroup.get('lastName')?.invalid &&
      this.formGroup.get('lastName')?.touched
    );
  }
  get invalidAge() {
    return (
      this.formGroup.get('age')?.invalid && this.formGroup.get('age')?.touched
    );
  }

  ngOnInit(): void {
    this.statesService.toUp();
  }

  createForm() {
    this.formGroup = this.fb.group({
      user: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
          Validators.pattern('^[a-zÀ-ÿ0-9._-]{6,16}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('^[a-zÀ-ÿ0-9._-]{8,20}$'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zÀ-ÿ0-9._%+-]+@[a-zÀ-ÿ0-9.-]+\\.[a-zÀ-ÿ]{2,4}$'),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern('[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+'),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern('[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+'),
        ],
      ],
      genre: ['male', [Validators.required]],
      age: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return Object.values(this.formGroup.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }
    this.signInRequest();
  }

  signInRequest(): boolean {
    if (this.sendingForm === false) {
      this.statesService.loadingWindow = true;
      this.sendingForm = true;

      const formData = this.formGroup.value;
      this.apiRequestService.postAccountDB(formData).subscribe({
        next: (res) => {
          if (res.message) {
            this.invalidRegister = res.message;
          } else {
            this.router.navigate(['/login']);
          }
          this.statesService.loadingWindow = false;
          this.sendingForm = false;
        },
        error: (error) => {
          return console.log(error);
        },
      });
    }

    return false;
  }

  setInvalidRegister() {
    this.invalidRegister = '';
  }

  setGenreChecked(reference: string) {
    this.genreChecked = reference;
  }

  setWatchPassword() {
    this.watchPassword = !this.watchPassword;
  }
}
