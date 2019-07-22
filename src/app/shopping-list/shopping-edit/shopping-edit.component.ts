import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, NgForm, FormGroup } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    constructor(private shoppingListService: ShoppingListService) { }
    @ViewChild('f', {static: false}) slForm: NgForm;
    editSubscription: Subscription;
    editMode = false;
    itemEditIndex: number;
    edittedItem: Ingredient;

  ngOnInit() {
      this.editSubscription = this.shoppingListService.editIngredient
        .subscribe( (index: number) => {
            this.editMode = true;
            this.itemEditIndex = index;
            this.edittedItem = this.shoppingListService.getIngredient(index);
            this.slForm.setValue({
                name: this.edittedItem.name,
                amount: this.edittedItem.amount
            })
        });
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
        this.shoppingListService.updateIngredient(this.itemEditIndex, newIngredient);
        this.editMode = false;
    } else{
        this.shoppingListService.addIngredient(newIngredient);
    }
      this.slForm.reset();
  }

  onClear() {
      this.slForm.reset();
      this.editMode = false;
  }

  onDelete() {
      this.shoppingListService.deleteIngredient(this.itemEditIndex);
      this.onClear();
  }
    ngOnDestroy(): void {
        this.editSubscription.unsubscribe();
    }





}
