import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  //! Injecting recipeService
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    //! listen to recipeService to get updates
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {

        // get updated recipes
        this.recipes = recipes;
      }

    )

    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    // ! this will target new recipe path, plus relativeTo object
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
