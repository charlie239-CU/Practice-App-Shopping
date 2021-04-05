import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { NoSelectedComponent } from "./recipes/recipe-detail/no-selected/no-selected.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const routes:Routes=[
    { path:'',redirectTo:'/recipes',pathMatch:'full' },
    {path:'recipes',component:RecipesComponent,children:[
        { path:'',component:NoSelectedComponent},
        { path:'new',component:RecipeEditComponent },
        { path:'recipe-list',component:RecipeListComponent },
        { path:':id',component:RecipeDetailComponent},
        { path:':id/edit',component:RecipeEditComponent }
       
    ]},
    {path:'shopping',component:ShoppingListComponent},
];

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[RouterModule]
})

export class AppRouteModule{

}