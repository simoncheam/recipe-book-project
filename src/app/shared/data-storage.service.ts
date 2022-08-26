import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators'
@Injectable({ providedIn: 'root' }) //! shortcut
export class DataStorageService {
    //! inject recipeService
    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put(
                'https://ng-course-recipe-book-c8e7a-default-rtdb.firebaseio.com/recipes.json',
                recipes
            )
            .subscribe((response) => {
                console.log(response);
            });
    }

    fetchRecipes() {
        this.http
            .get<Recipe[]>(
                'https://ng-course-recipe-book-c8e7a-default-rtdb.firebaseio.com/recipes.json'
            )
            .pipe(map(recipes => { // rxjs operator

                //! map through recipes array and set ingredients to empty array if non-existent
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                })
            }))
            .subscribe((recipes) => {
                this.recipeService.setRecipes(recipes);
            });
    }
}
