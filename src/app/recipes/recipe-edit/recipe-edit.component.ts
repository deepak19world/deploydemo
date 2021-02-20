import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  get  ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
  constructor(private route: ActivatedRoute,
              private recipeservice: RecipeService,
              private router: Router) { }

  ngOnInit() {
       this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.InitForm();
      }
    );
  }

  onAddIngredient(){
       (<FormArray>this.recipeForm.get('ingredients')).push(
             new FormGroup({
               'name': new FormControl(null,Validators.required),
               'amount': new FormControl(null,Validators.required)
             })
       );
  }
  OnDeleteIngredient(index: number){
     (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  OnCancel(){
        this.router.navigate(['../'],{relativeTo: this.route});
  }

  OnSubmit(){
    if(this.editMode){
      this.recipeservice.updateRecipe(this.id,this.recipeForm.value);
    }
    else
    {
      this.recipeservice.addRecipe(this.recipeForm.value);
    }
    this.OnCancel();
  }
  private InitForm(){
     let recipeName = '';
     let recipeImagePath = '';
     let recipedescription = '';
     let recipeIngredients = new FormArray([]);

     if(this.editMode){
       const recipe = this.recipeservice.getRecipe(this.id);
       recipeName = recipe.name;
       recipeImagePath = recipe.imagePath;
       recipedescription = recipe.description;
       if(recipe['ingredients']){
         for(let ingredient of recipe.ingredients){
           recipeIngredients.push(
             new FormGroup({
               'name': new FormControl(ingredient.name,Validators.required),
               'amount': new FormControl(ingredient.amount,Validators.required)
             })
           );
         }
       }
     }

     this.recipeForm = new FormGroup({
       'name': new FormControl(recipeName, Validators.required),
       'imagePath': new FormControl(recipeImagePath,Validators.required),
       'description': new FormControl(recipedescription,Validators.required),
       'ingredients': recipeIngredients
     });
  }



}
