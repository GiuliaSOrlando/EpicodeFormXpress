import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        nome: this.fb.control(null, [Validators.required]),
        cognome: this.fb.control(null, [Validators.required]),
        username: ['', [Validators.required, Validators.minLength(5)]],
        sexes: this.fb.control(null, [Validators.required]),
        profileImage: [null],
        biography: ['', Validators.maxLength(500)],
        email: this.fb.control(null, [Validators.required, Validators.email]),
        password: this.fb.control(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        'confirm-password': this.fb.control(null, [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  sexes: string[] = ['Male', 'Female', 'Other'];
  selectedSex!: string;

  isValid(fieldName: string) {
    return this.form.get(fieldName)?.valid;
  }

  isTouched(fieldName: string) {
    return this.form.get(fieldName)?.touched;
  }

  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirm-password')?.value;
    if (password === confirmPassword) {
      return null;
    } else {
      console.log(formGroup);
      return { passwordMismatch: true };
    }
  }

  onProfileImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files?.length) {
      const file = inputElement.files[0];
      this.form.patchValue({ profileImage: file });
      this.form.get('profileImage')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    } else {
    }
  }
}
