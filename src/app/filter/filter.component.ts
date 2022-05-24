import { Url } from './../models/url';
import { Button } from './../shared/buttons';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, RouteConfigLoadStart, Router, Routes } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  button: Button = new Button();
  currentUrl: any;
  showFilter: boolean;
  constructor(public route: Router) { }

  ngOnInit(): void {
    this.filterViewByURL();


  }


  filterViewByURL() {
    this.route.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.currentUrl = e;
      if (this.currentUrl.url === "/deck" ||
        this.currentUrl.url === "/wheel" ||
        this.currentUrl.url === "/truck" ||
        this.currentUrl.url === "/complete"
      ) {
        this.showFilter = true;
      }
      else {
        this.showFilter = false;
      }

    });
  }





}
