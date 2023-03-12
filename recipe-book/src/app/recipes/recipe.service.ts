import {Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is simply a test',
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 21),
      ]),
    new Recipe(
      'Babguláás',
      'This is simply a test',
      'https://post.healthline.com/wp-content/uploads/2018/04/steak-meat-1200x628-facebook-1200x628.jpg',
      [
        new Ingredient('Buns',2),
        new Ingredient('Meat', 1)
      ]),
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  // just a copy
  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
      this.shoppingListService.addIngredients(ingredients)
  }


}
