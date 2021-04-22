import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../auth/auth-guard";
import { NoSelectedComponent } from "./recipe-detail/no-selected/no-selected.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeResolverService } from "./recipe-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes:Routes=[
    
    {path:'',component:RecipesComponent,
    canActivate:[AuthGuardService]
    ,children:[
        { path:'',component:NoSelectedComponent},
        { path:'new',component:RecipeEditComponent },
        { path:'recipe-list',component:RecipeListComponent },
        { path:':id',component:RecipeDetailComponent,resolve:[RecipeResolverService]},
        { path:':id/edit',component:RecipeEditComponent,resolve:[RecipeResolverService] }
       
    ]},
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})
export class RecipeRoutingModule{

}