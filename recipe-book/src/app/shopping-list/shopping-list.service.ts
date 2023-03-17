import {Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientSelected = new Subject<number>();
  private ingredients: Ingredient[]  = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10)
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(id: number){
    return this.ingredients[id];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  delete(index: number) {
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
