import { HttpClient, HttpErrorResponse, HttpHeaderResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, pipe, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import {environment} from "../../environments/environment"

export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:string
}

@Injectable({providedIn:'root'})
export class AuthService{
    tokenExpirationTimer:any;
    user=new BehaviorSubject<User>(null)
    constructor(private http:HttpClient,
        private router:Router){

    }

    signUp(email:string,password:string){

        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.environmentApiKey,
        {
            email:email,
            password:password,
            returnSecureToken:true
        }
       ).pipe(
            catchError(this.handleError),
            tap(resData=>
                this.handleAuthentication
                (resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn))
        )


    }
    signIn(email:string,password:string){
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.environmentApiKey,
        {
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(
            catchError(this.handleError),
            tap(resData=>
                {
            this.handleAuthentication
                (resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn)
           // console.log(resData.expiresIn)
        })
        )
    }

    private handleError(errorRes:HttpErrorResponse){
        let errorMessage="Unknown error occured";
        if(!errorRes.error || !errorRes.error.error)
        {
            return throwError(errorMessage)
        }
        
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage="This email already exist";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage="This email doesn't exist";
                break;
            case 'INVALID_PASSWORD':
                errorMessage="Incorrect password";
                break;
        }
        return throwError(errorMessage)
     
    }

    private handleAuthentication(email:string,userId:string,token:string,expiresIn:number)
    {
        const expirationDate=new Date(new Date().getTime()+ +expiresIn*1000);
                const user=new User(email,
                                    userId,
                                    token,
                                    expirationDate
                                    )
                
                this.user.next(user); 
                //console.log(expirationDate)
                this.autoLogout(expiresIn*1000)
                localStorage.setItem('userData',JSON.stringify(user))
    }

    autoLogin(){
        const localUser:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
        }=
        JSON.parse(localStorage.getItem('userData'))
        if(!localUser)
        {
            //console.log(localUser)
            return
        }
        //console.log(localUser)
        const loadedUser=new User(localUser.email,localUser.id,localUser._token,
                                    new Date(localUser._tokenExpirationDate));
        //console.log(loadedUser.token)
        if(loadedUser.token){
            this.user.next(loadedUser)
            const expirationDuration=new Date(localUser._tokenExpirationDate).getTime()-
                                        new Date().getTime()
            
            this.autoLogout(expirationDuration)
            
        }
    }
    onLogout(){
        this.user.next(null);
        localStorage.removeItem('userData')
        this.router.navigate(['/auth'])
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer=null
    }

    autoLogout(expirationDuration:number){
        console.log(expirationDuration)
        this.tokenExpirationTimer= setTimeout(()=>{
            this.onLogout()
        },expirationDuration)
       
    }
}

    