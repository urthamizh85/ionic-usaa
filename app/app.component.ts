import { Component,ViewChild } from '@angular/core';
import { Nav ,Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';
import { ReportPage } from '../pages/report';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
@ViewChild(Nav) nav: Nav;

  searchInput: any = "";
  foodList: any;
  reportList: any;
  reportPage:any;
  constructor(platform: Platform, private http: HttpClient ) {
     this.reportPage = ReportPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.getFood();
    });
  }

  getFood() {
    this.http.get('https://api.nal.usda.gov/ndb/search/?format=json&q=' + this.searchInput + '&sort=n&max=25&offset=0&api_key=DEMO_KEY').subscribe((response) => {
      this.foodList = response.list.item;
    });
  }

  getNutrients(arg: any) {    
    this.http.get('https://api.nal.usda.gov/ndb/reports/?ndbno=' + arg + '&type=b&format=json&api_key=DEMO_KEY').subscribe((response) => {
      this.reportList = response.report.food.nutrients; 
    })
}
}