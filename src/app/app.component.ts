import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Forms';
  declarationCheck = false;
  maxDate: Date;
  constructor() {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear, 3, 30);
  }
  infoForm = new FormGroup({
    name: new FormControl(),
    gender: new FormControl(),
    country: new FormControl(),
    doB: new FormControl(),
    contactNo: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('(0/91)?[7-9][0-9]{9}'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    declaration: new FormControl(),
    submit: new FormControl(),
  });

  errorMessage = '';
  errorMessageContact = '';

  errorEmail() {
    if (this.infoForm.get('email')?.hasError('required'))
      this.errorMessage = 'You must enter a value';
    else if (this.infoForm.get('email')?.invalid)
      this.errorMessage = 'Not a valid email';
    else this.errorMessage = '';
  }
  errorContact() {
    if (this.infoForm.get('contactNo')?.hasError('required'))
      this.errorMessageContact = 'You must enter a value';
    else if (this.infoForm.get('contactNo')?.invalid)
      this.errorMessageContact = 'Please enter a 10 digit valid contact no !';
    else this.errorMessageContact = '';
  }
  onCheck() {
    this.declarationCheck = this.infoForm.get('declaration')?.value;
  }

  onSubmit() {
    console.log(this.infoForm.value);
    if (this.infoForm.valid) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your details has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid details',
        text: 'Details are not valid!',
        footer: '<p>Fill the valid details</p>',
      });
    }
  }
}
