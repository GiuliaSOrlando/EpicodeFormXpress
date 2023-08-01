import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsersFromDB();
  }

  getUsersFromDB() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users from the database!', error);
      }
    );
  }

  isUsernameUnique(username: string): boolean {
    return !this.users.some((user) => user.username === username);
  }

  onSubmit(loginForm: any) {
    if (loginForm.valid) {
      const username = loginForm.value.username;
      const password = loginForm.value.password;

      if (this.isUsernameUnique(username)) {
        this.http
          .post<any>('http://localhost:3000/users', { username, password })
          .subscribe(
            (response) => {
              console.log('Login successful!', response);
            },
            (error) => {
              console.error('Error adding new user!', error);
            }
          );
      } else {
        console.log(
          'Username already exists! Please choose a different username.'
        );
      }
    }
  }
}
