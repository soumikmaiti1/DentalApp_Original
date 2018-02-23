import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Toast } from '@ionic-native/toast';
import {QuizPage} from '../quiz/quiz';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public dataarr: any[];
  public quizarr:any[];
  public param1:any;
  public apiHost: string = 'assets/JSONDATA/quiz.json';
  constructor(public navCtrl: NavController, public http: Http, private toast: Toast) {
    this.loadwebService();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  loadwebService() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let options = new RequestOptions({ headers: headers });

    let postParams = {

    }


    this.http.post("https://y4a22ke4ci.execute-api.us-east-1.amazonaws.com/prod/category/fetch", JSON.stringify(postParams), options)
      .subscribe(data => {
        var response = JSON.parse(data['_body']);
        console.log(response);
        if (response.status == 0) {
          //alert("No question added yet");
        } else {
          this.dataarr = response.data;
          console.log(this.dataarr);
        }
      }, error => {
        console.log(error);// Error getting the data
      });
  }
  initiateTest(CategoryName, SubCategoryName) {
    //alert(CategoryName+"  "+SubCategoryName);
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    let options = new RequestOptions({ headers: headers });

    let postParams = {
      "UserId": "",
      "category": "",
      "subcategory": ""
    }
    this.http.post("assets/JSONDATA/quiz.json", JSON.stringify(postParams), options)
    .subscribe(data => {
      var response = JSON.parse(data['_body']);
      console.log(response);
      if (response.status == 0) {
        //alert("No question added yet");
      } else {
        this.quizarr = response.data;
        console.log(this.quizarr);
      }
    }, error => {
      console.log(error);// Error getting the data
    });
  }
  public getAll(CategoryName, SubCategoryName){
     this.http.get(this.apiHost)
      .toPromise()
      .then((response) => {
        console.log(response.json());
        //this.quizarr =(response.json());
        this.navCtrl.push(QuizPage,{quizarr:response.json(),param1:SubCategoryName});
        //return response.json();
      }).catch((err) => {
      console.log(err);
    });
}
}
