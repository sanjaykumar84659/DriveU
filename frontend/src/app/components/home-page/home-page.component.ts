import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  username: string | null = null;
  role: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.authService.userId$.subscribe(id => {
        this.username = id !== null ? `User ${id}` : null;
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
  }
}