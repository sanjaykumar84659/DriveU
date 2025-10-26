import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomernavComponent } from './components/customernav/customernav.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { DriverManagementComponent } from './components/driver-management/driver-management.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminViewDriversComponent } from './components/admin-view-drivers/admin-view-drivers.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AdminviewrequestsComponent } from './components/adminviewrequests/adminviewrequests.component';
import { CustomerviewdriverComponent } from './components/customerviewdriver/customerviewdriver.component';
import { CustomerviewfeedbackComponent } from './components/customerviewfeedback/customerviewfeedback.component';
import { CustomerviewrequestedComponent } from './components/customerviewrequested/customerviewrequested.component';
import { CustomerRequestComponent } from './components/customer-request/customer-request.component';
import { CustomerpostfeedbackComponent } from './components/customerpostfeedback/customerpostfeedback.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path:'error/:errorCode', component:ErrorComponent},

  {
    path: 'admin',
    component: AdminnavComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'ADMIN' },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path:'home',component:HomePageComponent},
      {path:'driver-management',component:DriverManagementComponent},
      { path: 'driver-management/:id', component: DriverManagementComponent },
      
      {path:'viewdriver',component:AdminViewDriversComponent},
      {path:'feedback',component:AdminviewfeedbackComponent},
      {path:'requests',component:AdminviewrequestsComponent},
      { path: '', component: DriverManagementComponent },
    ]
  },

  // CUSTOMER area (shell: CustomernavComponent)
  {
    path: 'customer',
    component: CustomernavComponent,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'CUSTOMER' },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {path:'home',component:HomePageComponent},
      { path: 'viewdriver', component: CustomerviewdriverComponent },
      { path: 'feedback', component: CustomerviewfeedbackComponent },
      {path:'viewrequest',component:CustomerviewrequestedComponent},

      {path:'customerrequest',component:CustomerRequestComponent},
      { path: 'customerrequest/:id', component: CustomerRequestComponent },
      {path:'postfeedback',component:CustomerpostfeedbackComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
