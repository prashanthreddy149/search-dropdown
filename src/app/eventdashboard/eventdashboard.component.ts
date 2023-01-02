import { Component, OnInit, SimpleChanges } from '@angular/core';
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


//   detaildata = new FormGroup({
//     device: new FormControl(),
//     event: new FormControl(),
//     state: new FormControl()
//  });

  page:number = 1;
  count:number=0;
  tableSize:number = 5;
  tableSizes: any = [5,10,15,20,25,30,35,40,45,50];
  lists: any;
  filteredOptions: any;
  options: any;
  optionsEvent: any;
  optionsState: any;
filteredOptionsEvent: any;
filteredOptionsState : any;
device: any;
event: number | undefined;
state: any;

isDescOrder:boolean=true;
orderHeader:string='';


constructor( private  eventserviceService:  EventserviceService,private fb : FormBuilder){}
table:Lists[]=[];

onTableDataChange(event:any)
{
this.page=event
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

private selectedDevice = 'allDevices'
private selectedEvent = 'allEvents'
private selectedState = 'allStates'


column = ["Context","Device","Event","FirstOccurrTime","LastOccurrTime","OccurrCount","PersistTime","ReceiveTime","State"];
index = ["context","device","event","firstoccurrencetime","lastoccurrencetime","occurrencecount","persisttime","receivetime","state"];
ngOnInit():void 
  {
    // this.initForm();
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  

    this.eventserviceService.getlist()
    .subscribe(
      data=>{
        this.deviceList = data.device;
        this.options = data.device;
        this.filteredOptions = data.device;
        

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
        this.optionsState = data3.state;
        this.filteredOptionsState = data3.state;
      }
    );

    this.detaildata = this.fb.group({
      device: [''],
      event: [''],
      state: [''],
    })


    // this.detaildata = new FormGroup({
    //   device: new FormControl(),
    //   event: new FormControl(),
    //   state: new FormControl()
    // })

    this.detaildata.valueChanges.subscribe(response => {
      return this.filterData(response) + "" + this.filterDataEvent(response) + "" + this.filterDataState(response);
    })

    this.eventserviceService.getAllList()
    .subscribe(
      data=>{
      //   if((data.device == "" && data.device == "allDevices") && (data.event == "" && data.event == "allEvents")            
      //    && (data.state == "" && data.state == "allStates") )
      //   {
      //   this.table = data.list;
      //   // console.log("data.list",data.list);
      //   this.eventTypeCount = data.eventTypeCount;
      //   this.chartSeries = Object.values(data.pieListData);
      //   this.chartLabels = Object.keys(data.pieListData);
      // }
      
      this.table = data.list;
      // console.log("data.list",data.list);
      this.eventTypeCount = data.eventTypeCount;
      this.chartSeries = Object.values(data.pieListData);
      this.chartLabels = Object.keys(data.pieListData);

        // if (data.device == "" && data.event != "" && data.state != "")
        //        {
        //          // alert("device is null");
        //          this.eventserviceService.getUserWithoutDevice(data.event,data.state)
        //          .subscribe(
        //            data=>{    
        //             //  this.lists = data.device;
        //              this.table = data.list;
        //              this.eventTypeCount = data.eventTypeCount;
        //              this.chartSeries = Object.values(data.pieListData);
        //              this.chartLabels = Object.keys(data.pieListData);
        //            }
        //          );
        //        };
        //        if (data.event == "" && data.state != "" && data.device != "")
        //        {
        //          // alert("event is null");
        //          this.eventserviceService.getUserWithoutEvent(data.device,data.state)
        //          .subscribe(
        //            data=>{    
        //              // this.lists = data.device;
        //              this.table = data.list;
        //              this.eventTypeCount = data.eventTypeCount;
        //              this.chartSeries = Object.values(data.pieListData);
        //              this.chartLabels = Object.keys(data.pieListData);
        //            }
        //          );
        //        };
        //        if (data.state == ""&& data.event != "" && data.device != "")
        //        {
        //          // alert("state is null");
        //          this.eventserviceService.getUserWithoutState(data.device,data.event)
        //          .subscribe(
        //            data=>{    
        //              this.table = data.list;
        //              // this.lists = data.device;
        //              this.eventTypeCount = data.eventTypeCount;
        //              this.chartSeries = Object.values(data.pieListData);
        //              this.chartLabels = Object.keys(data.pieListData);
        //            }
        //          );
        //        };
        //        if (data.state == "" && data.event == "" && data.device!="")
        //        {
        //          // alert("event & state is null");
        //          this.eventserviceService.getUserWithoutStateAndEvent(data.device)
        //          .subscribe(
        //            data=>{    
        //              this.table = data.list;
        //              // this.lists = data.device;
        //              this.eventTypeCount = data.eventTypeCount;
        //              this.chartSeries = Object.values(data.pieListData);
        //              this.chartLabels = Object.keys(data.pieListData);
        //            }
        //          );
        //        };

        //        if (data.state == "" && data.device=="" && data.event!= "")
        //        {
        //          // alert("event & state is null");
        //          this.eventserviceService.getUserWithoutStateAndDevice(data.event)
        //          .subscribe(
        //            data=>{    
        //              this.table = data.list;
        //              // this.lists = data.device;
        //              this.eventTypeCount = data.eventTypeCount;
        //              this.chartSeries = Object.values(data.pieListData);
        //              this.chartLabels = Object.keys(data.pieListData);
        //            }
        //          );
        //        };

        //        if (data.event == "" && data.device=="" && data.state!= "")
        //        {
        //          // alert("event & state is null");
        //          this.eventserviceService.getUserWithoutEventAndDevice(data.state)
        //          .subscribe(
        //            data=>{    
        //              this.table = data.list;
        //              // this.lists = data.device;
        //              this.eventTypeCount = data.eventTypeCount;
        //              this.chartSeries = Object.values(data.pieListData);
        //              this.chartLabels = Object.keys(data.pieListData);
        //            }
        //          );
        //        };

        //        if (data.device!= "" && data.event!= "" && data.state!= ""){
        //          // alert("all are available");
                 
        //          this.eventserviceService.getUsersMultipleParams(data.device,data.event,data.state)
        //          // this.eventserviceService.getSelectedDataReport(selectedDeviceName,selectedEventName,selectedStateName)
        //          .subscribe(
        //                data=>{   
        //                  this.table = data.list; 
        //                  // this.lists = data.device;
        //                  this.eventTypeCount = data.eventTypeCount;
        //                  this.chartSeries = Object.values(data.pieListData);
        //                  this.chartLabels = Object.keys(data.pieListData);
        //                }
        //              );
        //        }
                        

              //   if (data.device!== "" && data.event! == "" && data.state! == ""){
              //    // alert("all are available");
              //    this.eventserviceService.getUsersMultipleParams(data.device,data.event,data.state)
              //    // this.eventserviceService.getSelectedDataReport(selectedDeviceName,selectedEventName,selectedStateName)
              //    .subscribe(
              //          data=>{   
              //            this.table = data.list; 
              //            this.lists = data.device;
              //            this.eventTypeCount = data.eventTypeCount;
              //            this.chartSeries = Object.values(data.pieListData);
              //            this.chartLabels = Object.keys(data.pieListData);
              //          }
              //        );
              //  }




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
  // console.log('enteredData');
this.filteredOptionsEvent=this.optionsEvent.filter((event: number) => {
return event.toFixed().indexOf(enteredData.event) > -1;
})
}

filterDataState(enteredData: any)
{
this.filteredOptionsState=this.optionsState.filter((state: any) => {
return state.toLowerCase().indexOf(enteredData.state) > -1;
})
}

sort(headerName){
this.isDescOrder= !this.isDescOrder;
this.orderHeader=headerName;

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
  this.DeviceSelected = selectedDeviceName;
  if(this.DeviceSelected)  
  {
  this.eventserviceService.getDeviceForSelectedDeviceByParam(selectedDeviceName,this.EventSelected,this.StateSelected)
  .subscribe(
    data=>{       
      this.table = data.list;
      this.eventTypeCount = data.eventTypeCount;
      this.chartSeries = Object.values(data.pieListData);
      this.chartLabels = Object.keys(data.pieListData);
    }
  );
}
if(this.DeviceSelected=="" || this.DeviceSelected=='allDevices')
{
  this.eventserviceService.getAllList()
  .subscribe(
    data=>{       
      this.table = data.list;
      this.eventTypeCount = data.eventTypeCount;
      this.chartSeries = Object.values(data.pieListData);
      this.chartLabels = Object.keys(data.pieListData);
    }
  );
}

      //          if ((this.StateSelected == "" || this.StateSelected=="allStates")  
      //          && (this.EventSelected == "" || this.EventSelected=="allEvents") 
      //          && (this.DeviceSelected!="" && this.DeviceSelected!="allDevices"))
      //          {
      //            // alert("event & state is null");
      //            this.eventserviceService.getUserWithoutStateAndEvent(this.DeviceSelected)
      //            .subscribe(
      //              data=>{    
      //                this.table = data.list;
      //                // this.lists = data.device;
      //                this.eventTypeCount = data.eventTypeCount;
      //                this.chartSeries = Object.values(data.pieListData);
      //                this.chartLabels = Object.keys(data.pieListData);
      //              }
      //            );
      //          };

      // if ((this.DeviceSelected== "" || this.DeviceSelected=="allDevices") &&
      //  (this.EventSelected!= "" && this.EventSelected!="allEvents") &&
      //  (this.StateSelected!= "" && this.StateSelected!="allStates"))
      // {
      //   // alert("device is null");
      //   this.eventserviceService.getUserWithoutDevice(this.EventSelected,this.StateSelected)
      //   .subscribe(
      //     data=>{    
      //       // this.lists = data.device;
      //       this.table = data.list;
      //       this.eventTypeCount = data.eventTypeCount;
      //       this.chartSeries = Object.values(data.pieListData);
      //       this.chartLabels = Object.keys(data.pieListData);
      //     }
      //   );
      // };

      if ((this.StateSelected!= "" && this.StateSelected!="allStates") ||
      (this.DeviceSelected != "" && this.DeviceSelected!="allDevices") || 
      (this.EventSelected != "" && this.EventSelected!="allEvents"))
{
           //  if (this.DeviceSelected!= "" && this.EventSelected!= "" && this.StateSelected!= ""){
              // alert("all are available");
              
              this.eventserviceService.getUsersMultipleParams(this.DeviceSelected,this.EventSelected,this.StateSelected)
              // this.eventserviceService.getSelectedDataReport(selectedDeviceName,selectedEventName,selectedStateName)
              .subscribe(
                    data=>{   
                      this.table = data.list; 
                      // this.lists = data.device;
                      this.eventTypeCount = data.eventTypeCount;
                      this.chartSeries = Object.values(data.pieListData);
                      this.chartLabels = Object.keys(data.pieListData);
                    }
                  );
            }

            

}
onEventSelected(selectedEventNumber:any):void{
  this.EventSelected = selectedEventNumber;
  console.log("with device and event" ,this.StateSelected);
  console.log("with device and event" , this.DeviceSelected);
  console.log("with device and event" , this.EventSelected);

  if(this.EventSelected)
  {
  this.eventserviceService.getDeviceForSelectedEventByParam(selectedEventNumber,this.DeviceSelected,this.StateSelected)
  .subscribe(
    data=>{       
      this.table = data.list;
      this.eventTypeCount = data.eventTypeCount;
      this.chartSeries = Object.values(data.pieListData);
      this.chartLabels = Object.keys(data.pieListData);
    }
  );
  }
  if(this.EventSelected=="" || this.EventSelected=='allEvents')
{
  this.eventserviceService.getAllList()
  .subscribe(
    data=>{       
      this.table = data.list;
      this.eventTypeCount = data.eventTypeCount;
      this.chartSeries = Object.values(data.pieListData);
      this.chartLabels = Object.keys(data.pieListData);
    }
  );
}

if ((this.DeviceSelected == "" || this.DeviceSelected=="allDevices") && 
(this.StateSelected=="" || this.StateSelected=="allStates") &&  
(this.EventSelected!= "" &&  this.EventSelected!="allEvents"))
               {
                 // alert("event & state is null");
                 this.eventserviceService.getUserWithoutStateAndDevice(this.EventSelected)
                 .subscribe(
                   data=>{    
                     this.table = data.list;
                     // this.lists = data.device;
                     this.eventTypeCount = data.eventTypeCount;
                     this.chartSeries = Object.values(data.pieListData);
                     this.chartLabels = Object.keys(data.pieListData);
                   }
                 );
               };

                     if ((this.EventSelected == "" || this.EventSelected=="allEvents") && 
                     (this.DeviceSelected != "" && this.DeviceSelected!="allDevices") && 
                     (this.StateSelected != "" && this.StateSelected!="allStates"))
      {
        // alert("device is null");
        this.eventserviceService.getUserWithoutEvent(this.DeviceSelected,this.StateSelected)
        .subscribe(
          data=>{    
            // this.lists = data.device;
            this.table = data.list;
            this.eventTypeCount = data.eventTypeCount;
            this.chartSeries = Object.values(data.pieListData);
            this.chartLabels = Object.keys(data.pieListData);
          }
        );
      };

      if ((this.StateSelected!= "" && this.StateSelected!="allStates") &&
      (this.DeviceSelected!= "" && this.DeviceSelected!="allDevices") && 
      (this.EventSelected!= "" && this.EventSelected!="allEvents"))
{
           //  if (this.DeviceSelected!= "" && this.EventSelected!= "" && this.StateSelected!= ""){
              // alert("all are available");
              
              this.eventserviceService.getUsersMultipleParams(this.DeviceSelected,this.EventSelected,this.StateSelected)
              // this.eventserviceService.getSelectedDataReport(selectedDeviceName,selectedEventName,selectedStateName)
              .subscribe(
                    data=>{   
                      this.table = data.list; 
                      // this.lists = data.device;
                      this.eventTypeCount = data.eventTypeCount;
                      this.chartSeries = Object.values(data.pieListData);
                      this.chartLabels = Object.keys(data.pieListData);
                    }
                  );
            }


}
onSateSelected(selectedStateName:any):void{
  this.StateSelected = selectedStateName;
  
  if(this.StateSelected)
  {
  this.eventserviceService.getDeviceForSelectedStateByParam(selectedStateName,this.DeviceSelected,this.EventSelected)
  .subscribe(
    data=>{       
      this.table = data.list;
      this.eventTypeCount = data.eventTypeCount;
      this.chartSeries = Object.values(data.pieListData);
      this.chartLabels = Object.keys(data.pieListData);
    }
  );
  }
  if(this.StateSelected=="" || this.StateSelected=='allStates')
  {
    this.eventserviceService.getAllList()
    .subscribe(
      data=>{       
        this.table = data.list;
        this.eventTypeCount = data.eventTypeCount;
        this.chartSeries = Object.values(data.pieListData);
        this.chartLabels = Object.keys(data.pieListData);
      }
    );
  }

  if ((this.DeviceSelected == "" || this.DeviceSelected=="allDevices") && 
  (this.EventSelected == "" || this.EventSelected=="allEvents") && 
  (this.StateSelected!="" && this.StateSelected!=="allStates"))
  {
    // alert("event & state is null");
    this.eventserviceService.getUserWithoutEventAndDevice(this.StateSelected)
    .subscribe(
      data=>{    
        this.table = data.list;
        // this.lists = data.device;
        this.eventTypeCount = data.eventTypeCount;
        this.chartSeries = Object.values(data.pieListData);
        this.chartLabels = Object.keys(data.pieListData);
      }
    );
  };



        if ((this.StateSelected == "" || this.StateSelected=="allStates") &&
         (this.DeviceSelected!= "" && this.DeviceSelected!="allDevices") && 
         (this.EventSelected!= "" && this.EventSelected!="allEvents"))
{
  
// alert("device is null");
this.eventserviceService.getUserWithoutState(this.DeviceSelected,this.EventSelected)
.subscribe(
data=>{    
// this.lists = data.device;
this.table = data.list;
this.eventTypeCount = data.eventTypeCount;
this.chartSeries = Object.values(data.pieListData);
this.chartLabels = Object.keys(data.pieListData);
}
);
};

      if ((this.StateSelected!= "" && this.StateSelected!="allStates") &&
         (this.DeviceSelected != "" && this.DeviceSelected!="allDevices") && 
         (this.EventSelected != "" && this.EventSelected!="allEvents"))
{
              //  if (this.DeviceSelected!= "" && this.EventSelected!= "" && this.StateSelected!= ""){
                 // alert("all are available");
                 
                 this.eventserviceService.getUsersMultipleParams(this.DeviceSelected,this.EventSelected,this.StateSelected)
                 // this.eventserviceService.getSelectedDataReport(selectedDeviceName,selectedEventName,selectedStateName)
                 .subscribe(
                       data=>{   
                         this.table = data.list; 
                         // this.lists = data.device;
                         this.eventTypeCount = data.eventTypeCount;
                         this.chartSeries = Object.values(data.pieListData);
                         this.chartLabels = Object.keys(data.pieListData);
                       }
                     );
               }


}
}


