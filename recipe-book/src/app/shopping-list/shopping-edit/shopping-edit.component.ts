import {Component, ElementRef, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {
  }
  onAddIngredient(name: string) {
    this.shoppingListService.addIngredient(new Ingredient(name, this.amountInput.nativeElement.value));
  }
}
