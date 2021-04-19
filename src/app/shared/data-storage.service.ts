import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators"
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn:'root'})
export class DataStorageService{
    constructor(private http: HttpClient,
        private recipeService:RecipeService){

    }

    saveData(){
        const recipes=this.recipeService.getRecipeCopy();
        this.http.put("https://ng-recipe-book-project-5173a-default-rtdb.firebaseio.com/recipes.json"
        ,recipes)
        .subscribe(
            res=>{
                console.log(res)
            }
        )
    }

    fetchData(){
        const recipes:Recipe=null

        return this.http.get<Recipe[]>("https://ng-recipe-book-project-5173a-default-rtdb.firebaseio.com/recipes.json")
        .pipe(map(recipes=>{
            return recipes.map(recipe=>{
                return {
                    ...recipe,
                    ingredient:recipe.ingredient?recipe.ingredient:[]
                };
            });
        }),
        tap(recipes=>{
            this.recipeService.setRecipes(recipes)
        })
        )
       
    }
}