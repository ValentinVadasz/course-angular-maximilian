import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  onAddToList() {
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.selectedRecipe = this.recipeService.getRecipes()[this.id];
        }
      )
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
