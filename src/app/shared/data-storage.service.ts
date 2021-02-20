import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take , map , tap, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable()

export class DataStorageService{
  constructor(private http: HttpClient, private recipeService: RecipeService, private authservice:AuthService){}

   storeRecipes(){
       const recipes = this.recipeService.getRecipes();
       this.http.put('https://ng-shoppingproj-default-rtdb.firebaseio.com/recipes.json',recipes)
       .subscribe(response =>{
           console.log(response);
       });
   }

   fetchRecipes(){
     
           return this.http.get<Recipe[]>(
                 'https://ng-shoppingproj-default-rtdb.firebaseio.com/recipes.json'
        
           ).pipe(
                   map(recipes =>{
                 return recipes.map(recipe =>{
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            tap(recipes =>{
                this.recipeService.setRecipes(recipes); 
            })
         );
   }
}