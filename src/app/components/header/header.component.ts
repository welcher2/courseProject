import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

    activeTab: string = ''
    collapsed = true;
    subscription: Subscription;
    isAuthenticated = false;

  constructor(private httpService: HttpService, private recipeService: RecipeService, private authService: AuthService) { 
      
  }

  ngOnInit() {
      this.subscription = this.authService.user.subscribe( user => {
          this.isAuthenticated = user ? true : false;
      });
  }

  onSaveData() {
        this.httpService.storeRecipes();
  }

  onFetchData() {
      this.httpService.fetchRecipes().subscribe(event => {});
  }

  onLogout() {
      this.authService.logout();
  }

  ngOnDestroy():void {
      this.subscription.unsubscribe();
  }

}
