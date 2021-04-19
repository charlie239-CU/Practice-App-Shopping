import {  HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { tap } from "rxjs/operators";
import { LoadingService } from "./loading.service";

@Injectable({providedIn:'root'})

export class LoggingInterceptorService implements HttpInterceptor{
    constructor(private loadingService:LoadingService){

    }
    intercept(req:HttpRequest<any>,next:HttpHandler){
            console.log("request sent")
            this.loadingService.statusChanged.next(true)
        return next.handle(req).pipe(tap(
            event=>{
                if(event.type===HttpEventType.Response)
                {
                    console.log("response arrived")
                    this.loadingService.statusChanged.next(false)
                }
            }
        ))

    }
}