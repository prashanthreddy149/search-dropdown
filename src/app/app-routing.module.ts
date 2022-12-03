import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventdashboardComponent } from './eventdashboard/eventdashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:"home",component:HomeComponent
  },
  {
    path:"",component:HomeComponent
  },
  {
    path:"eventdashboard",component:EventdashboardComponent
  },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
