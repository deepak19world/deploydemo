import { Recipe } from "./recipe.model";
import { Injectable } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";


@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    constructor(private slservice: ShoppingListService ) {}

    private recipes: Recipe[] = [];
    //  private recipes:Recipe[] = [
//         new Recipe(
//             'A test Recipie',
//         'This is a simple test',
//         'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg',
//         [
//             new Ingredient('Meat', 1),
//             new Ingredient('French Fries',20)
//         ]),
//         new Recipe(
//             'Another test Recipie',
//             'This is a simple test',
//             'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg',
//           [
//               new Ingredient('Buns',2),
//               new Ingredient('Meat',2)
//           ])
//       ];

      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(id: number){
          return this.recipes[id];
      }

      setRecipes(recipes: Recipe[]){
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes.slice());
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slservice.addIngredients(ingredients);
      }
      
      addRecipe(recipe: Recipe){
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
          this.recipes.splice(index,1);
          this.recipesChanged.next(this.recipes.slice());
      }

}
