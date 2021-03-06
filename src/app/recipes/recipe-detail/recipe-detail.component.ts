import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe
  id:number
  constructor(private shoppingService:ShoppingService,
    private route:ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router) {
    
   }

   sendIngredient(){
     this.recipe.ingredient.forEach(element => {
      this.shoppingService.setIngredient(element)
     });
     
   }
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.recipe=this.recipeService.recipes[+params['id']];
      this.id=+params['id'];
    })
  }
  removeRecipe(){
    this.recipeService.delRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}
