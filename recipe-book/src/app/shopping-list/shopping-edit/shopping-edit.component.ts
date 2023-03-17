import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') ingredientForm: NgForm;
  private selectIngredientSubscription: Subscription;
  editMode = false;
  private editedItemIndex: number;
  private editedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  onSubmit() {
    const ingredient = new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.ingredientForm.reset();
    this.editMode = false;
  }

  ngOnInit(): void {
    this.selectIngredientSubscription = this.shoppingListService
      .ingredientSelected.subscribe(
        (id: number) => {
          this.editMode = true;
          this.editedItemIndex = id;
          this.editedIngredient = this.shoppingListService.getIngredient(id);
          this.ingredientForm.form.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount
          })
        });
  }

  ngOnDestroy(): void {
    this.selectIngredientSubscription.unsubscribe();
  }

  onResetForm() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onResetForm();
    this.shoppingListService.delete(this.editedItemIndex);
  }
}
