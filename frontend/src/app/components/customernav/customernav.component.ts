import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customernav',
  templateUrl: './customernav.component.html',
  styleUrls: ['./customernav.component.css'],
  // imports: [RouterModule]
  })
export class CustomernavComponent implements OnInit {
  username: string | null = null;
  role: string | null = null;
  isLoggedIn: boolean = false;
  showLogoutPopup = false;

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.authService.username$.subscribe(name => {
        this.username = name;
      });

      this.authService.role$.subscribe(role => {
        this.role = role;
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.username = null;
    this.role = null;
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  confirmLogout() {
    this.showLogoutPopup = false;
    this.logout();
  }
  
  cancelLogout() {
    this.showLogoutPopup = false;
  }
}