import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Lists } from './Lists';

@Injectable({
  providedIn: 'root'
})
export class EventserviceService {
  get: any;
 
  constructor(private httpclient:HttpClient){}

getlist():Observable<any>{
    return this.httpclient.get("/d3api/getDropDownList");
}

getAllList():Observable<any>{
    return this.httpclient.get("/d3api/getDropDown");
}
// getSelectedDataReport(selectedDeviceName:any,selectedEventName:any,selectedStateName:any){
//   let params1 = new HttpParams().set('device',selectedDeviceName);
//   let params2 = new HttpParams().set('event',selectedEventName);
//   let params3 = new HttpParams().set('state',selectedStateName);
//   console.log("params1",params1); 
//   console.log("params2",params2);
//   console.log("params3",params3);
//   return this.httpclient.get("/d3api/getDropDown",{params:params1});
  
// }
getDeviceForSelectedDeviceByParam(selectedDeviceName:string):Observable<Lists>{

  let params1 = new HttpParams();
  params1 = params1.set('device',selectedDeviceName);

  return this.httpclient.get<Lists>("/d3api/getDropDown",{params:params1});

}

getDeviceForSelectedEventByParam(selectedEventNumber:string,selectedDeviceName:string):Observable<Lists>{

  let params1 = new HttpParams();
  params1 = params1.set('device',selectedDeviceName);
  params1 = params1.set('event',selectedEventNumber);
  return this.httpclient.get<Lists>("/d3api/getDropDown",{params:params1});

}

getDeviceForSelectedStateByParam(selectedStateName:string,selectedDeviceName:string):Observable<Lists>{

  let params1 = new HttpParams();
  params1 = params1.set('device',selectedDeviceName);
  params1 = params1.set('state',selectedStateName);

  return this.httpclient.get<Lists>("/d3api/getDropDown",{params:params1});

}
public getUsersMultipleParams(device: string,event: any,state: any): Observable<Lists> {
  const url = '/d3api/getDropDown';
  // let parameters = {device:"device",event:"event",state:"state"};
  // let queryParams = new HttpParams({ fromObject: 
  //   {
  //     device: device,
  //     event: event,
  //     state: state
  // } }); 
  let queryParams = new HttpParams();
  queryParams = queryParams.appendAll( {
    "device": device,
    "event": event,
    "state": state
} );


  return this.httpclient.get<Lists>(url + queryParams.toString());
}


// public getUsersNotMultipleParams(device: any,event: any,state: any): Observable<any> {
//   const url = 'http://dashboard.engrid.in/d3api/getDropDown';
//   let parameters = {"device":device,"event":event,"state":state};
//   let queryParams = new HttpParams({ fromObject: parameters }); 
//   return this.httpclient.get<any>(url,{params:queryParams});
// }


public getUserWithoutDevice(event: any,state: any): Observable<Lists> {
  const url = 'http://dashboard.engrid.in/d3api/getDropDown';
  let parameters = {"event":event,"state":state};
  let queryParams = new HttpParams({ fromObject: parameters }); 
  return this.httpclient.get<Lists>(url,{params:queryParams});
}
public getUserWithoutEvent(device: any,state: any): Observable<Lists> {
  const url = 'http://dashboard.engrid.in/d3api/getDropDown';
  let parameters = {"device":device,"state":state};
  let queryParams = new HttpParams({ fromObject: parameters }); 
  return this.httpclient.get<Lists>(url,{params:queryParams});
}
public getUserWithoutState(device: any,event: any): Observable<Lists> {
  const url = 'http://dashboard.engrid.in/d3api/getDropDown';
  let parameters = {"device":device,"event":event};
  let queryParams = new HttpParams({ fromObject: parameters }); 
  return this.httpclient.get<Lists>(url,{params:queryParams});
}
public getUserWithoutEventAndDevice(state: any): Observable<Lists> {
  const url = 'http://dashboard.engrid.in/d3api/getDropDown';
  let parameters = {"state":state};
  let queryParams = new HttpParams({ fromObject: parameters }); 
  return this.httpclient.get<Lists>(url,{params:queryParams});
}
public getUserWithoutStateAndDevice(event: any): Observable<Lists> {
  const url = 'http://dashboard.engrid.in/d3api/getDropDown';
  let parameters = {"event":event};
  let queryParams = new HttpParams({ fromObject: parameters }); 
  return this.httpclient.get<Lists>(url,{params:queryParams});
}
public getUserWithoutStateAndEvent(device: any): Observable<Lists> {
  const url = 'http://dashboard.engrid.in/d3api/getDropDown';
  let parameters = {"device":device};
  let queryParams = new HttpParams({ fromObject: parameters }); 
  return this.httpclient.get<Lists>(url,{params:queryParams});
}
}
