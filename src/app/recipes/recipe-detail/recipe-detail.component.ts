import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 recipe: Recipe;
 id: number;
  constructor(private recipeservice: RecipeService , 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
     this.route.params
     .subscribe(
       (params: Params) => {
         this.id = +params['id'];
         this.recipe = this.recipeservice.getRecipe(this.id);
       }
     );
  }

  onAddToShoppingList(){
      this.recipeservice.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  OnEdit(){
     this.router.navigate(['edit'], {relativeTo: this.route});
  }

  OnDelete(){
    this.recipeservice.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
