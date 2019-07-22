import {Ingredient} from '../shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public id: number;

    constructor(name: string, desc: string, image: string, ingredients: Ingredient[], id: number)
    {
        this.name = name;
        this.description = desc;
        this.imagePath = image;
        this.ingredients = ingredients;
        this.id = id;
    }
}