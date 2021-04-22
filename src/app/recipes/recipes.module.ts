import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../shared/shared.module";
import { NoSelectedComponent } from "./recipe-detail/no-selected/no-selected.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeRoutingModule } from "./recipe-routing.module";
import { RecipesComponent } from "./recipes.component";

@NgModule({
  declarations: [

    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    NoSelectedComponent  ],
  imports: [
    RouterModule, CommonModule, ReactiveFormsModule, NgbModule,
    RecipeRoutingModule,
    SharedModule,
    
  ],
  exports: [
  ]
})
export class RecipeModule {

}