import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f',{static:false}) formData:NgForm
  fetchedData:Ingredient
  susbcribe:Subscription
  editingIndex:number;
  editingIngredient:Ingredient
  checkEditing:boolean=false;
 constructor(private shoppingService:ShoppingService){

 }
 num:number
  ngOnInit(): void {
    this.susbcribe=this.shoppingService.startedEditing.subscribe(
      (index:number)=>{
        this.editingIndex=index;
        this.checkEditing=true
        this.editingIngredient=this.shoppingService.getIngredientByIndex(index)
        this.formData.setValue({
          'name':this.editingIngredient.name,
          'amount':this.editingIngredient.amount,
        })
      }
    )
  }
  setShoppingData()
  {
    this.fetchedData=this.formData.value;
    if(this.checkEditing)
    {
      this.shoppingService.updateIngredient(this.editingIndex,this.fetchedData)
        this.formData.reset()
    }
    else{
      this.shoppingService.setIngredient(this.fetchedData)
      this.formData.reset()
    }
    //console.log(this.fetchedData)
    
  }

  delIngredient(){
    this.shoppingService.deleteIngreident(this.editingIndex)
    this.formData.reset()
  }


}
