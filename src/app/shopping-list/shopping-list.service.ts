import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService {
    editIngredient = new Subject<number>();
    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredientArray: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Bananas', 8)
    ];

    getIngredients() {
        return this.ingredientArray.slice();
    }

    getIngredient(index: number) {
        return this.ingredientArray[index];
    }

    addIngredient(ingredient: Ingredient)
    {
        this.ingredientArray.push(ingredient);
        this.ingredientsChanged.next(this.ingredientArray.slice());
    }

    addShoppingList(ingredient: Ingredient[]) {        
        this.ingredientArray.push(...ingredient);
        this.ingredientsChanged.next(this.ingredientArray.slice());
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredientArray[index] = ingredient;
        this.ingredientsChanged.next(this.ingredientArray.slice());
    }

    deleteIngredient(index: number) {
        this.ingredientArray.splice(index, 1)
        this.ingredientsChanged.next(this.ingredientArray.slice());
    }
}