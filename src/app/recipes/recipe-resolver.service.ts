import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { HttpService } from '../shared/http.service';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private httpService: HttpService, private recipeService: RecipeService){

    }

    resolve(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<Recipe[]> {
        if(this.recipeService.getRecipes.length > 0)
        {
            return null;
        }
        else 
        {
            return this.httpService.fetchRecipes();
        }

    }

}