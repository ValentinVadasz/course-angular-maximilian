import {Component,OnInit} from '@angular/core';
import {UsersService} from "../shared/users.service";

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {
  users: string[] = [];

  constructor(private accountService: UsersService) {
  }

  onSetToActive(id: number) {
    this.accountService.setToActive(id);
  }

  ngOnInit(): void {
    this.users=this.accountService.inactiveUsers;
  }
}
