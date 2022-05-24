import { Button } from './../shared/buttons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  button:Button=new Button();

  constructor() { }

  ngOnInit(): void {
  }

}
