import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService{

    recipeSelected=new EventEmitter<Recipe>()

   recipes:Recipe[]
    constructor(){
    this.recipes=[
        new Recipe(0,"chowmin","Very tasty dish rated 5/5",
        "https://i2.wp.com/vegecravings.com/wp-content/uploads/2019/04/Vegetarian-Chowmein-Recipe-Step-By-Step-Instructions.jpg?fit=1024%2C830&quality=65&strip=all&ssl=1",
        [
            new Ingredient("chicken",2),
            new Ingredient("soya sauce",20)
        ]),
        new Recipe(1,"maggi","Very tasty maggi rated 4/5",
        "https://i2.wp.com/vegecravings.com/wp-content/uploads/2019/04/Vegetarian-Chowmein-Recipe-Step-By-Step-Instructions.jpg?fit=1024%2C830&quality=65&strip=all&ssl=1",
        [
            new Ingredient("meda",10),
            new Ingredient("magic masala",20)
        ]),
        new Recipe(2,"soya chaap","soya chaap by vivek rated 5/5",
        "https://www.funfoodfrolic.com/wp-content/uploads/2018/07/Soya-Chaap-Masala-3.jpg",
        [
            new Ingredient("soya",20),
            new Ingredient("onion",30)
        ]),
  
  
      ];
    }

    getRecipeCopy()
    {
        return this.recipes.slice()
    }
}