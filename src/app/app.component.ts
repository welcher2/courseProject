import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from './shared/http.service';
import { Subscription } from 'rxjs';
import { RecipeService } from './recipes/recipe.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'courseProject';
  loadedFeature = 'recipe';
  subscription: Subscription;

  constructor(private httpService: HttpService, private recipeService: RecipeService, private authService: AuthService) {
  }

  ngOnInit() {
      this.subscription = this.recipeService.recipeChanged
          .subscribe(recipes => {
              this.httpService.storeRecipes();
          });
        this.authService.autoLogin();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
