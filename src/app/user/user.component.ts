import { Component } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user: any;

  constructor(private userService: UserService,private authService: AuthService){}

  ngOnInit(): void {
    this.user = this.userService.getUserData().subscribe(response =>{
      this.user = response
    })
  }

  onDeleteUser(): void {
    this.userService.deleteUser().subscribe(response => {
      this.authService.logout()
    })
  }
}
