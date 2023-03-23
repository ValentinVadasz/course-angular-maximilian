import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {NoRecipeComponent} from "./recipe-list/recipe-item/no-recipe/no-recipe.component";
import {authGuard} from "../auth/auth.guard";
import {recipeResolver} from "./recipe.service";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";

const recipeRouting: Routes = [
  {
    path: '', component: RecipesComponent, children: [
      {
        path: '',
        component: NoRecipeComponent, pathMatch: 'full',
        canActivate: [authGuard],
        resolve: {recipe: recipeResolver}
      },
      {path: 'new', component: RecipeEditComponent},
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: {recipe: recipeResolver}
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: {recipe: recipeResolver}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(recipeRouting)],
  exports: [RouterModule]
})
export class RecipeRoutingModule {

}
