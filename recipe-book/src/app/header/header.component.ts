import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() selectedRoute = new EventEmitter<string>();
  collapsed = true;

  onSelect(route: string) {
    this.selectedRoute.emit(route);
  }
}
