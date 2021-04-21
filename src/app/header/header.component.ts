import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/authService.service';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls:['header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy, OnChanges{
    isAuthenticated=false
    subscribed:Subscription
   constructor(private dataStorageService:DataStorageService,
    private authService:AuthService,
    private router:Router){}
   
    ngOnInit()
    {
        this.subscribed=this.authService.user.subscribe(user=>{
            if(user!==null)
            {
                this.isAuthenticated=true;
            }
            else
            {
                this.isAuthenticated=false;
            }
        })
    }
    ngOnDestroy()
    {
        this.subscribed.unsubscribe();
    }
    ngOnChanges(){
        console.log(this.isAuthenticated)
    }
   
   saveData(){
        this.dataStorageService.saveData();
   }
   
   fetchData(){
       this.dataStorageService.fetchData().subscribe();
   }

   onLogout(){
       this.authService.onLogout()
   }    

}