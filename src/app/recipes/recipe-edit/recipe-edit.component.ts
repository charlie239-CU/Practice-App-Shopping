import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number
  isEdit:boolean=false
  recipeForm:FormGroup
  data
  constructor(private route:ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=+params['id']
      this.isEdit=params['id']!=null
      this.initRecipeForm()
      this.data=(<FormArray>this.recipeForm.controls['ingredients']).controls
    })
  }

  initRecipeForm()
  {
    let recipeName="";
    let recipeImagePath="";
    let recipeDescription="";
    let recipeIngredients=new FormArray([]);
    if(this.isEdit){
      const recipe=this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription=recipe.description;

      if(recipe['ingredient'])
      {
          for(let ingredient of recipe.ingredient)
          {
            recipeIngredients.push(
              new FormGroup({
                'name':new FormControl(ingredient.name,Validators.required),
                'amount':new FormControl(ingredient.amount,[Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            )
          }
      }
    }

    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    })
  }

  addIngredient(){
     (<FormArray>this.recipeForm.get('ingredients')).push(
       new FormGroup({
         'name':new FormControl(null,Validators.required),
         'amount':new FormControl(null,[Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)])
       })
     ) 
  }
  onFormSubmit()
  {
    const submittedData=new Recipe(
      this.id,
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'],
    )
    if(this.isEdit)
    {
      this.recipeService.updateRecipe(this.id,submittedData);
      console.log(submittedData)
    }
    else{
      submittedData['id']=this.recipeService.getLastId()+1;
      this.recipeService.addRecipe(submittedData);
      console.log(this.recipeService.getLastId())
    }
    this.onCancel()
    
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }

  removeIngredientForm(index:number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
}
