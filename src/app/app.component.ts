import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { DataStorageService } from './shared/data-storage.service';
import { LoadingService } from './shared/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadingStatus:boolean=false
  title="project"
  constructor(private route:Router,
    private loadingSerive:LoadingService,
    private dataStorageService:DataStorageService){
    this.dataStorageService.fetchData().subscribe();
    
  }
  ngOnInit(){
    this.loadingSerive.statusChanged.subscribe(status=>{
      this.loadingStatus=status;
    })
  }

 
}
