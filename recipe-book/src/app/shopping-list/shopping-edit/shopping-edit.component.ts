import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('amountInput') amountInput: ElementRef;
  onAddIngredient(name: string) {
    this.ingredientAdded.emit(new Ingredient(name, this.amountInput.nativeElement.value));
  }
}
