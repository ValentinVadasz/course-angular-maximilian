import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CounterService {
  private activeToInactive: number = 0;
  private inactiveToActive: number = 0;

  logStatusChangeToActive() {
    console.log('Status changed from active to inactive:' + ++this.activeToInactive + ' times')
  }

  logStatusChangeToInactive() {
    console.log('Status changed from inactive to active:' + ++this.inactiveToActive + ' times')
  }
}
