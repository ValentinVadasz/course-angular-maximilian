import {Injectable} from "@angular/core";
import {map, tap} from "rxjs";

import {RecipeService} from "../recipes/recipe.service";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  token = null;
  private baseUrl = 'https://course-angular-by-maximilian-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    this.http
      .put(
        this.baseUrl + 'recipes.json',
        this.recipeService.getRecipes())
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        this.baseUrl + 'recipes.json'
      ).pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
