import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, ControlContainer } from '@angular/forms';
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
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
      this.route.params 
        .subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.editMode = params['id'] != null;
                this.initForm();
            }
        )
  }

    addIngredient() {
       (<FormArray>this.recipeForm.get('ingredients')).push(
           new FormGroup({
               'name': new FormControl(null, Validators.required),
               'amount': new FormControl(null, [Validators.required, this.invalidAmount])
           })
       )
    }

  private initForm() {
    let recipeName = '';
    let recipeImage = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
        const recipe = this.recipeService.getRecipe(this.id);
        recipeName = recipe.name;
        recipeImage = recipe.imagePath;
        recipeDesc = recipe.description;
        if(recipe['ingredients']){
            for(let ingredient of recipe.ingredients){
                recipeIngredients.push(
                    new FormGroup({
                        name: new FormControl(ingredient.name, Validators.required),
                        amount: new FormControl(ingredient.amount, [Validators.required, this.invalidAmount])
                    })
                );
            }
        }
    }

      this.recipeForm = new FormGroup({
          'name': new FormControl((recipeName), Validators.required),
          'imagePath': new FormControl((recipeImage), Validators.required),
          'description': new FormControl((recipeDesc), Validators.required),
          'ingredients': recipeIngredients
      })
  }

  onSubmit() {
    //   const newRecipe = new Recipe(
    //       this.recipeForm.value['name'],
    //       this.recipeForm.value['description'],
    //       this.recipeForm.value['imagePath'],
    //       this.recipeForm.value['ingredients'],
    //       this.id
    //   );
        if(this.editMode) {
            this.recipeService.updateRecipe(this.id, this.recipeForm.value);
            this.editMode = false;
        } else {
            this.recipeService.addRecipe(this.recipeForm.value);
        }
        this.navigateAway();
  }

  invalidAmount(control: FormControl): {[s: string]: boolean} {
        if(control.value <= 0) {
            return {'invalidAmount': true};
        } else {
            return null;
        }
  }

  getControls() {
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  navigateAway() {
      this.router.navigate(['../', {relativeTo: this.route}]);
  }

  deleteIngredient(index: number) {
     (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
