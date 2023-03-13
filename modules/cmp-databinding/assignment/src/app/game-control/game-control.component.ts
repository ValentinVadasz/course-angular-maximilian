import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  current: number = 0;
  @Output() tickEvent = new EventEmitter<number>();
  timerRef;

  onStartGame() {
    this.timerRef = setInterval(() => {
      this.tickEvent.emit(this.current++);
    }, 1000);
  }

  onStopGame() {
    clearTimeout(this.timerRef);
  }
}
