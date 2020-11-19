import { Component, OnInit } from '@angular/core';
import { BasicService } from '../services/basic.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public basicService:BasicService) { }

  ngOnInit(): void {
  }
}
