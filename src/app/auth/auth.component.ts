import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService,AuthResponseData } from './authService.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  switchButton=true;//true=signIn false=signup
  getError=""
  isError:boolean=false 
  isLoading=false
  constructor(private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    
  }

  switchMode(){
    this.switchButton=!this.switchButton
  }

  onSubmit(authData:NgForm){
    if(!authData.valid){
      return
    }
    const email=authData.value.email;
    const password=authData.value.password;
    this.isLoading=true
    let authObs:Observable<AuthResponseData>
    if(this.switchButton){
      authObs=this.authService.signIn(email,password)
      
    }
    else
    {
      authObs=this.authService.signUp(email,password)
      
    }
    authObs.subscribe(resData=>{
      console.log(resData)
      this.isError=false
      this.isLoading=false
      this.router.navigate(['/recipes']);
    },
    error=>{
      this.isError=true
      this.isLoading=false
      this.getError=error
      this.router.navigate(['/recipes']);
      
    })

    authData.reset();

  }
}
