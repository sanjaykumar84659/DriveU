import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminViewDriversComponent } from './components/admin-view-drivers/admin-view-drivers.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AdminviewrequestsComponent } from './components/adminviewrequests/adminviewrequests.component';
import { CustomerRequestComponent } from './components/customer-request/customer-request.component';
import { CustomernavComponent } from './components/customernav/customernav.component';
import { CustomerpostfeedbackComponent } from './components/customerpostfeedback/customerpostfeedback.component';
import { CustomerviewdriverComponent } from './components/customerviewdriver/customerviewdriver.component';
import { CustomerviewfeedbackComponent } from './components/customerviewfeedback/customerviewfeedback.component';
import { CustomerviewrequestedComponent } from './components/customerviewrequested/customerviewrequested.component';
import { DriverManagementComponent } from './components/driver-management/driver-management.component';
import { ErrorComponent } from './components/error/error.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AUTH_INTERCEPTOR_PROVIDER } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AdminViewDriversComponent,
    AdminnavComponent,
    AdminviewfeedbackComponent,
    AdminviewrequestsComponent,
    CustomerRequestComponent,
    CustomernavComponent,
    CustomerpostfeedbackComponent,
    CustomerviewdriverComponent,
    CustomerviewfeedbackComponent,
    CustomerviewrequestedComponent,
    DriverManagementComponent,
    ErrorComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule
  ],
  providers: [AUTH_INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
