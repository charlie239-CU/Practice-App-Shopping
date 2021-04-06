import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingService{
    ingredientChanged=new Subject<Ingredient[]>()
    ingredients:Ingredient[]=[
        new Ingredient("Apples",5),
        new Ingredient("Tomato",10)
      ]
    setIngredient(ingredient:Ingredient)
  {
     
    this.ingredients.push(ingredient)
    this.ingredientChanged.next(this.ingredients.slice())
  }
  getIngredientCopy()
  {
      return this.ingredients.slice()
      
  }
}