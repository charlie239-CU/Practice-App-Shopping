import { Component, Input, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input('takeRecipeToDetail') recipe:Recipe
  constructor(private shoppingService:ShoppingService) {
    
   }
   sendIngredient(){
     this.recipe.ingredient.forEach(element => {
      this.shoppingService.setIngredient(element)
     });
     
   }
  ngOnInit(): void {
  }

}
