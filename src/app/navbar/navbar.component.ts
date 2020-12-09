import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { BasicService } from '../services/basic.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public basicService:BasicService,private jwtHelper: JwtHelperService) 
  {
    this.basicService.Token=this.jwtHelper.decodeToken(localStorage.getItem("jwt"));
  }

  ngOnInit(): void {
    
  }
}
