import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  @ViewChild('f',{static:false}) slForm: NgForm;
  subscp : Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private slservice: ShoppingListService) { }

  ngOnInit() {
    this.subscp =  this.slservice.StartedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slservice.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
      }
    );
  }
  OnSubmit(form: NgForm){
      const value = form.value;
      const newIngredient = new Ingredient(value.name,value.amount);
      if(this.editMode){
        this.slservice.updateIngredient(this.editedItemIndex , newIngredient);
      }
      else
      {
        this.slservice.addIngredient(newIngredient);
      }
     this.editMode = false;
      form.reset();
      
  }

  ngOnDestroy(){
    this.subscp.unsubscribe();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  OnDelete(){
    this.slservice.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
