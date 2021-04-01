import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  openComp:string=""
  setData(event:string)
  {
    console.log(event)
    this.openComp=event
  }
}
