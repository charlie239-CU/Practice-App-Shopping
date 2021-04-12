import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingService{
    ingredientChanged=new Subject<Ingredient[]>()
    startedEditing=new Subject<number>();
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
  getIngredientByIndex(index:number)
  {
    return this.ingredients[index]
  }

  updateIngredient(index:number,ingredient:Ingredient)
  {
    this.ingredients[index]=ingredient
    this.ingredientChanged.next(this.ingredients.slice())
  }

  deleteIngreident(index:number){
    this.ingredients.splice(index,1)
    this.ingredientChanged.next(this.ingredients.slice())
  }
}