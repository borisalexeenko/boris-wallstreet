import { Component, OnInit } from '@angular/core';
import {BrokersService, Stock} from "../shared/brokers.service";
import {NgForm} from "@angular/forms";
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-stocks-form',
  templateUrl: './stocks-form.component.html',
  styleUrls: ['./stocks-form.component.css']
})
export class StocksFormComponent implements OnInit {

  isShown: Boolean;
  formData: Stock;

  constructor(private brokerService: BrokersService) {
    this.brokerService.currentStockFormStockState.subscribe(v => {
      this.isShown = v;
    })
    this.brokerService.currentStockState.subscribe(v => {
      this.formData = v;
    })
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.brokerService.addStock(new Stock(uuid(),
      form.value.stockName,
      form.value.stockDistributionLaw,
      form.value.stockMaxToChange,
      form.value.stockStartPrice))
      .then(() => {location.reload()});
  }

  closeForm() {
    this.brokerService.closeFormStock();
  }

}
