import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrokersComponent} from "./brokers/brokers.component";
import {StocksComponent} from "./stocks/stocks.component";
import {ParamsComponent} from "./params/params.component";

const routes: Routes = [
  {path: 'brokers', component: BrokersComponent},
  {path: 'stocks', component: StocksComponent},
  {path: 'params', component: ParamsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
