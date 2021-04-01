import { Directive, ElementRef, HostBinding, HostListener, OnChanges, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector:"[appDirective]"
})
export class DropdownDirective implements OnInit,OnChanges {

    @HostBinding('class.show') isOpen=false
        constructor()
        {
           
        }
        @HostListener('mouseover') toggleOpen()
        {
            this.set(this.isOpen)
            this.isOpen= !this.isOpen
           
        }
        set(data:boolean)
        {
            console.log(data)
            this.isOpen= data
        }
        ngOnInit(){
            
        }
        ngOnChanges(){
       
        }
        
          
        
}