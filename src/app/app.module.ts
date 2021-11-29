import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrokersComponent } from './brokers/brokers.component';
import {HttpClientModule} from "@angular/common/http";
import { BrokerFormComponent } from './broker-form/broker-form.component';
import {FormsModule} from "@angular/forms";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrokerEditComponent } from './broker-edit/broker-edit.component';
import { StocksComponent } from './stocks/stocks.component';
import { StocksFormComponent } from './stocks-form/stocks-form.component';
import { StocksEditComponent } from './stocks-edit/stocks-edit.component';
import { ParamsComponent } from './params/params.component';

@NgModule({
  declarations: [
    AppComponent,
    BrokersComponent,
    BrokerFormComponent,
    NavBarComponent,
    BrokerEditComponent,
    StocksComponent,
    StocksFormComponent,
    StocksEditComponent,
    ParamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
