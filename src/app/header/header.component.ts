import { Component, EventEmitter, Output } from '@angular/core';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent  {
    @Output('typeButton') headerButton=new EventEmitter<string>()
    constructor() { }

    clickHeaderButton(type:string)
    {
        this.headerButton.emit(type)
    }
}