import { Component, OnInit } from '@angular/core';
import { StatesService } from '../services/states.service';
import { ApiRequestService } from '../services/api-request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  account: any;
  formGroup!: FormGroup;
  invalidLogin: string;
  watchPassword: boolean;
  sendingForm: boolean;

  constructor(
    public statesService: StatesService,
    public apiRequestService: ApiRequestService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.invalidLogin = '';
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

  ngOnInit(): void {
    this.statesService.toUp();
  }

  createForm() {
    this.formGroup = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return Object.values(this.formGroup.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    }
    this.logInRequest();
  }

  logInRequest(): boolean {
    if (this.sendingForm === false) {
      this.statesService.loadingWindow = true;
      this.sendingForm = true;
      const formData = this.formGroup.value;
      this.apiRequestService.getAccountDB(formData).subscribe({
        next: (res) => {
          if (res.message) {
            this.invalidLogin = res.message;
          } else {
            console.log(res);
            localStorage.setItem('account', JSON.stringify(res[0]));
            this.statesService.getAccountLS();
            this.router.navigate([`account/${formData.user}`]);
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

  setInvalidLogin() {
    this.invalidLogin = '';
  }

  setWatchPassword() {
    this.watchPassword = !this.watchPassword;
  }
}
