import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private slService: ShoppingListService,
                     private activeRouter: ActivatedRoute,
                     private recipeService: RecipeService,
                     private router: Router) { }

  ngOnInit() {
      this.activeRouter.params
        .subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.recipe = this.recipeService.getRecipe(this.id);
            }
        );
  }

  addShoppingList() {
        this.slService.addShoppingList(this.recipe.ingredients);
  }
  
  onRecipeEdit() {
      this.router.navigate(['edit'], { relativeTo: this.activeRouter});
  }
  
    onDelete() {
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['../'], {relativeTo: this.activeRouter});
    }

}
