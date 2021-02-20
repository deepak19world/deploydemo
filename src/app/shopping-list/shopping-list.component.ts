import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy{
  ingredients: Ingredient[];
  private igchangesub : Subscription;
  constructor(private slservice: ShoppingListService ) { }

  ngOnInit() {
    this.ingredients = this.slservice.getIngredients();
    this.igchangesub = this.slservice.ingredientsChanged.subscribe(
       (ingredients: Ingredient[]) =>{
         this.ingredients = ingredients;
       }
    );
  }

  onEditItem(index : number){
         this.slservice.StartedEditing.next(index);
  }
  ngOnDestroy(){
    this.igchangesub.unsubscribe();
  }




}
