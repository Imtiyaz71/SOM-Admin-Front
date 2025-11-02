import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  clientMenuOpen = false; // dropdown state

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }

  toggleClientMenu() {
    this.clientMenuOpen = !this.clientMenuOpen;
  }

}
