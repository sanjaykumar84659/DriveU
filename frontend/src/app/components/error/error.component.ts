import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
 
  code!:number;
  backendMessage!:string;
  role!:string ;
  constructor(private router:Router,private route:ActivatedRoute, private authService:AuthService) { }
 
 
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.code = +(params.get('errorCode')!);
     
 
      this.route.queryParamMap.subscribe(queryParams => {
         this.backendMessage = queryParams.get('message') ?? '';
 
        // console.log('Error Code:', this.code);
        // console.log(typeof(this.code));
      });
    });
    this.authService.role$.subscribe(id => {
      this.role = id ?? '';
      console.log('User Role:', this.role);
    });
    }
  
  goHome(): void {
    if (this.role === 'ADMIN') {
      this.router.navigate(['/admin/home']);
    } else if (this.role === 'CUSTOMER') {
      this.router.navigate(['/customer/home']);
    } else {
      this.router.navigate(['']);
    }
  }

 
}