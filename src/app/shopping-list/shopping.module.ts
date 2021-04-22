import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingRoutingModule } from "./shopping-routing.module";

@NgModule({
    declarations:[
    ShoppingListComponent,
    ShoppingEditComponent,
    ],
    imports:[
        NgbModule,
        RouterModule,
        SharedModule,
        FormsModule,
        ShoppingRoutingModule
    ],
    
})

export class ShoppingModule{

}