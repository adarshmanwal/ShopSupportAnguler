import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
 selectedUsertype: any
 constructor(private auth: AuthService){
  this.selectedUsertype = this.auth.getcurrentUsertype()
 }
 onselectUser(selectedUsertype: any){
  this.auth.setcurrentUsertype(selectedUsertype)
  this.selectedUsertype = this.auth.getcurrentUsertype()
 }
}
