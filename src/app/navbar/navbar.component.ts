import { HttpService } from './../servises/http.service';
import { Button } from './../shared/buttons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  button: Button = new Button();
  search: string;


  constructor(private http: HttpService) { }

  ngOnInit(): void {


  };

  searchItem(searchInput:any) {
    if (!this.search||searchInput.invalid) {
      return
    } else {
      this.http.searchSubject.next(this.search)
    };

  };


};
