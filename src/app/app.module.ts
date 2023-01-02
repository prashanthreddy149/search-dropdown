import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CassandradashboardComponent } from './cassandradashboard/cassandradashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { EventdashboardComponent } from './eventdashboard/eventdashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';

const appRoutes: Routes = [
  {
    path:'eventdashboard' ,component : EventdashboardComponent
    // children: [
    //   { path:'eventdashboard' ,component : EventdashboardComponent },

    // ]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    MaincontentComponent,
   
    SidenavComponent,
    CassandradashboardComponent,
    EventdashboardComponent,
    FooterComponent,
    HomeComponent
    ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    OrderModule,
    DataTablesModule,
    MatInputModule,
    NgApexchartsModule,
    BrowserAnimationsModule,  
  ],
  exports:[
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
