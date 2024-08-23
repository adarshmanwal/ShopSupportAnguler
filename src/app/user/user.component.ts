import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user: any;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.user = this.userService.getUserData().subscribe(response =>{
      this.user = response
    })
  }
}
