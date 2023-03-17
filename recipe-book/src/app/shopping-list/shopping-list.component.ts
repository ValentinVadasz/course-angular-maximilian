import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "./shopping-list.service";
import {Subscriber, Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private changeSubscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.changeSubscription = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      )
  }

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
  }

  onSelectIngredient(id: number) {
    this.shoppingListService.ingredientSelected.next(id);
  }
}
