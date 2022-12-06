import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lists } from '../Lists';
// import { RestService } from '../rest.service';
import { EventserviceService } from '../eventservice.service';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

import {
  ChartComponent,
  // ApexAxisChartSeries,
  // ApexChart,
  // ApexXAxis,
   ApexTitleSubtitle,
  // ApexNonAxisChartSeries,
  // ApexDataLabels,
  // ApexResponsive,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend
} from "ng-apexcharts";
import { data } from 'jquery';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-eventdashboard',
  templateUrl: './eventdashboard.component.html',
  styleUrls: ['./eventdashboard.component.css']
})
export class EventdashboardComponent implements OnInit {
  detaildata!: FormGroup; 

  page:number = 1;
  count:number=0;
  tableSize:number = 5;
  tableSizes: any = [5,10,15,20,25,30,35,40,45,50];
  lists: any;
  filteredOptions: any;
  options: any;
  optionsEvent: any;
filteredOptionsEvent: any;
constructor( private  eventserviceService:  EventserviceService,private fb : FormBuilder){}
table:Lists[]=[];

// initForm()
// {
//   this.detaildata = this.fb.group({
//     device:new FormControl('',Validators.required)
//   })
//   this.detaildata.valueChanges.subscribe(response => {
//     console.log('data is' + response)
//     this.filterData(response);
//   })
// }

// filterData(enteredData)
// {
// }

onTableDataChange(event:any)
{
this.page=event;
this.getAllList();
}
  getAllList() {
    throw new Error('Method not implemented.');
  }

chartSeries:ApexNonAxisChartSeries=[];
chartDetails:ApexChart={
  type:'pie',
  toolbar:{
    show:true
  }
  
};

chartTitle:ApexTitleSubtitle = {
  // text: 'Leading Events',
  align: 'center',
  
};
chartDataLabels:ApexDataLabels = {
  enabled:false
};
chartLabels:any;
eventTypeCount:any;
deviceList:any;
eventList:any;
stateList:any;
DeviceSelected:string='';
EventSelected:string='';
StateSelected:string='';
column = ["Context","Device","Event","FirstOccurrTime","LastOccurrTime","OccurrCount","PersistTime","ReceiveTime","State"];
index = ["context","device","event","firstoccurrencetime","lastoccurrencetime","occurrencecount","persisttime","receivetime","state"];
ngOnInit():void 
  {
    // this.initForm();
    // if (!localStorage.getItem('foo')) { 
    //   localStorage.setItem('foo', 'no reload') 
    //   location.reload() 
    // } else {
    //   localStorage.removeItem('foo') 
    // }
  

    this.eventserviceService.getlist()
    .subscribe(
      data=>{
        this.deviceList = data.device;
        this.options = data.device;
        this.filteredOptions = data.device;
        
        // setTimeout(():void => { window.location.reload(); });
      }
    );

    this.eventserviceService.getlist()
    .subscribe(
      data2=>{
        this.eventList = data2.event;
        this.optionsEvent = data2.event;
        this.filteredOptionsEvent = data2.event;
      }
    );
    this.eventserviceService.getlist()
    .subscribe(
      data3=>{
        this.stateList = data3.state;

      }
    );

    this.detaildata = this.fb.group({
      device: [''],
      event: [''],
      state: [''],
    })
    this.detaildata.valueChanges.subscribe(response => {
      console.log(response);
      this.filterData(response);
      this.filterDataEvent(response);
    })

    this.eventserviceService.getAllList()
    .subscribe(
      data=>{
        this.table = data.list;
        // console.log("data.list",data.list);
        this.eventTypeCount = data.eventTypeCount;
        this.chartSeries = Object.values(data.pieListData);
        this.chartLabels = Object.keys(data.pieListData);
      }
    );
}

filterData(enteredData: any)
{
  
this.filteredOptions=this.options.filter((device: any) => {
return device.toLowerCase().indexOf(enteredData.device) > -1;
})
}

filterDataEvent(enteredData: any)
{
  console.log('enteredData');
this.filteredOptionsEvent=this.optionsEvent.filter((event: number) => {
return event.toFixed().indexOf(enteredData.event) > -1;
})
}


// showdashboard(selectedDeviceName:any,selectedEventName:any,selectedStateName:any):void{

//   console.log(this.detaildata.value);
//   console.log(this.detaildata.get['device'].value);
  
//   // this.eventserviceService.getSelectedDataReport(selectedDeviceName,selectedEventName,selectedStateName)
//   // .subscribe(
//   //   data=>{       
//   //     this.lists = data.list;
//   //     this.eventTypeCount = data.eventTypeCount;
//   //     this.chartSeries = Object.values(data.pieListData);
//   //     this.chartLabels = Object.keys(data.pieListData);
//   //   }
//   // );

// }
// onClickSubmit(data: { device: string; event: string; state: string; }):void {
//   // alert("Entered Device id : " + data.device);
 

 

//       if (data.device == "" && data.event != "" && data.state != "")
//       {
//         // alert("device is null");
//         this.eventserviceService.getUserWithoutDevice(data.event,data.state)
//         .subscribe(
//           data=>{    
//             // this.lists = data.device;
//             this.table = data.list;
//             this.eventTypeCount = data.eventTypeCount;
//             this.chartSeries = Object.values(data.pieListData);
//             this.chartLabels = Object.keys(data.pieListData);
//           }
//         );
//       };
//       if (data.event == "" && data.state != "" && data.device != "")
//       {
//         // alert("event is null");
//         this.eventserviceService.getUserWithoutEvent(data.device,data.state)
//         .subscribe(
//           data=>{    
//             // this.lists = data.device;
//             this.table = data.list;
//             this.eventTypeCount = data.eventTypeCount;
//             this.chartSeries = Object.values(data.pieListData);
//             this.chartLabels = Object.keys(data.pieListData);
//           }
//         );
//       };
//       if (data.state == ""&& data.event != "" && data.device != "")
//       {
//         // alert("state is null");
//         this.eventserviceService.getUserWithoutState(data.device,data.event)
//         .subscribe(
//           data=>{    
//             this.table = data.list;
//             // this.lists = data.device;
//             this.eventTypeCount = data.eventTypeCount;
//             this.chartSeries = Object.values(data.pieListData);
//             this.chartLabels = Object.keys(data.pieListData);
//           }
//         );
//       };
//       if (data.state == "" && data.event == "")
//       {
//         // alert("event & state is null");
//         this.eventserviceService.getUserWithoutStateAndEvent(data.device)
//         .subscribe(
//           data=>{    
//             this.table = data.list;
//             // this.lists = data.device;
//             this.eventTypeCount = data.eventTypeCount;
//             this.chartSeries = Object.values(data.pieListData);
//             this.chartLabels = Object.keys(data.pieListData);
//           }
//         );
//       };
//       if (data.device != "" && data.event != "" && data.state != ""){
//         // alert("all are available");
//         this.eventserviceService.getUsersMultipleParams(data.device,data.event,data.state)
//         // this.eventserviceService.getSelectedDataReport(selectedDeviceName,selectedEventName,selectedStateName)
//         .subscribe(
//               data=>{   
//                 this.table = data.list; 
//                 // this.lists = data.device;
//                 this.eventTypeCount = data.eventTypeCount;
//                 this.chartSeries = Object.values(data.pieListData);
//                 this.chartLabels = Object.keys(data.pieListData);
//               }
//             );
//       }
// }

onDeviceSelected(selectedDeviceName:any):void{
  //console.log(event);
  //this.DeviceSelected = event.target.value;
  this.eventserviceService.getDeviceForSelectedDeviceByParam(selectedDeviceName)
  .subscribe(
    data=>{       
      this.lists = data.list;
      this.eventTypeCount = data.eventTypeCount;
      this.chartSeries = Object.values(data.pieListData);
      this.chartLabels = Object.keys(data.pieListData);
    }
  );
}
onEventSelected(selectedEventNumber:any):void{
  this.eventserviceService.getDeviceForSelectedEventByParam(selectedEventNumber)
  .subscribe(
    data=>{       
      this.lists = data.list;
      this.eventTypeCount = data.eventTypeCount;
      this.chartSeries = Object.values(data.pieListData);
      this.chartLabels = Object.keys(data.pieListData);
    }
  );
}
onSateSelected(selectedStateName:any):void{
  this.eventserviceService.getDeviceForSelectedStateByParam(selectedStateName)
  .subscribe(
    data=>{       
      this.lists = data.list;
      this.eventTypeCount = data.eventTypeCount;
      this.chartSeries = Object.values(data.pieListData);
      this.chartLabels = Object.keys(data.pieListData);
    }
  );
}
}


