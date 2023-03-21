import {inject, Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {DataStorageService} from "../shared/data-storage.service";

export const recipeResolver: ResolveFn<Recipe[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const recipes = inject(RecipeService).getRecipes();
  if (recipes.length === 0) {
    console.log('resolver is running');
    return inject(DataStorageService).fetchRecipes();
  } else {
    return recipes;
  }
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeListChange = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A test recipe',
  //     'This is simply a test',
  //     'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 21),
  //     ]),
  //   new Recipe(
  //     'Babguláás',
  //     'This is simply a test',
  //     'https://post.healthline.com/wp-content/uploads/2018/04/steak-meat-1200x628-facebook-1200x628.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ]),
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {
  }

  // just a copy
  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeListChange.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeListChange.next(this.recipes.slice());
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeListChange.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeListChange.next(this.recipes.slice());
  }
}
