import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
//  selectedUsertype: any
//  constructor(private auth: AuthService){
//   this.selectedUsertype = this.auth.getcurrentUsertype()
//  }
//  onselectUser(selectedUsertype: any){
//   this.auth.setcurrentUsertype(selectedUsertype)
//   this.selectedUsertype = this.auth.getcurrentUsertype()
//  }
 constructor(private auth: AuthService,private router: Router){
  
 }

ngOnInit(): void {
  this.router.navigate(['auth/signin'])
}

}
