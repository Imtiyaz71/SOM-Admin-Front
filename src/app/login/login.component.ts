import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ ngIf
import { FormsModule } from '@angular/forms';   // ✅ ngModel
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,               // ✅ standalone component
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model = {
    id: 0,
    fullName: '',
    userName: '',
    passwords: ''
  };

  errorMsg = '';

  constructor(private router: Router, private auth: AuthService) {}

  login() {
    this.auth.login(this.model).subscribe({
      next: (res) => {
        if(res && res.token) {
          this.auth.saveToken(res.token);
          this.router.navigate(['/main/dashboard']);
        } else {
          this.errorMsg = 'Invalid username or password';
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Server error, try again later';
      }
    });
  }
}
