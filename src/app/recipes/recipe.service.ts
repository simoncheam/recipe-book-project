import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();


  private recipes: Recipe[] = [
    new Recipe('A Test Recipe1', 'This is a Test Recipe1', 'https://getsmartratsolutions.com/wp-content/uploads/2021/11/thanksgiving-recipe-ideas.jpg'),
    new Recipe('A Test Recipe2', 'This is a Test Recipe2', 'https://getsmartratsolutions.com/wp-content/uploads/2021/11/thanksgiving-recipe-ideas.jpg'),
  ]

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }
}
