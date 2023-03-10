import {Component, Input} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {
  }

  onAddToList() {
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
  }
}
