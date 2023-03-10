import {Injectable} from "@angular/core";
import {CounterService} from "./counter.service";

@Injectable()
export class UsersService {
  get activeUsers(): string[] {
    return this._activeUsers;
  }
  get inactiveUsers(): string[] {
    return this._inactiveUsers;
  }
  private _activeUsers = ['Max', 'Anna'];
  private _inactiveUsers = ['Chris', 'Manu'];

  constructor(private counterService: CounterService) {
  }

  setToInactive(id: number) {
    this._inactiveUsers.push(this._activeUsers[id]);
    this._activeUsers.splice(id, 1);
    this.counterService.logStatusChangeToInactive();
  }

  setToActive(id: number) {
    this._activeUsers.push(this._inactiveUsers[id]);
    this._inactiveUsers.splice(id, 1);
    this.counterService.logStatusChangeToActive();

  }
}
