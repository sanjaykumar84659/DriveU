import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DriveU Frontend';
  isAdmin: boolean = false;
  isCustomer: boolean = false;

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'ADMIN';
    this.isCustomer = role === 'CUSTOMER';
  }
}
