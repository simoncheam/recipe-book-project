import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomato', 10),
  ];

  //* get ingredients and return copy using slice method
  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }


  //* Add ingredient method
  addIngredient(ingredient: Ingredient) {
    console.log('--- addIngredient method -slService')
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    console.log('--- addIngredients method -slService')
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice())

  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());


  }

  deleteIngredient(index: number) {

    this.ingredients.splice(index, 1); //! starts at index and removes one element
    this.ingredientsChanged.next(this.ingredients.slice());

  }


  constructor() { }
}
