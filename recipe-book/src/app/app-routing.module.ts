import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {NoRecipeComponent} from "./recipes/recipe-list/recipe-item/no-recipe/no-recipe.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {recipeResolver} from "./recipes/recipe.service";
import {AuthComponent} from "./auth/auth.component";
import {authGuard} from "./auth/auth.guard";

const routing: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {
    path: 'recipes', component: RecipesComponent, children: [
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
  },
  {path: 'shopping-list', component: ShoppingListComponent},
  {
    path: 'auth',
    component: AuthComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routing)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
