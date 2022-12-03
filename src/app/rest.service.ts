import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lists } from './Lists';

const httpOptions = {
  header: new HttpHeaders({
    'Content-Type':'application/json',
    'Access-Controll-Allow-Origin':'*'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient) {}

    url : string = "/d3api/getDropDown";

    getList(){
      return this.http.get<Lists[]>(this.url);
    }

}
