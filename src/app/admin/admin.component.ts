import { Component, OnInit } from '@angular/core';
import { BasicService } from '../services/basic.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
details :any;
  constructor(private basicService: BasicService) { }

  ngOnInit(): void {
    this.basicService.getDetails().subscribe(
      (res:any)=>{
        this.details=res;
      },
      (err)=>{
        console.log("Error");
        
      }
    );
    this.basicService.getUserRole();
  }

}
