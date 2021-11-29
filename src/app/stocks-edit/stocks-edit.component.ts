import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Broker, BrokersService, Stock} from "../shared/brokers.service";

@Component({
  selector: 'app-stocks-edit',
  templateUrl: './stocks-edit.component.html',
  styleUrls: ['./stocks-edit.component.css']
})
export class StocksEditComponent implements OnInit {
  isShown: Boolean;
  formData: Stock;

  constructor(private brokerService: BrokersService) {
    this.brokerService.currentStockEditModalState.subscribe(v => {
      this.isShown = v;
    })
    this.brokerService.currentStockEditState.subscribe(v => {
      this.formData = v;
    })
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let id = this.formData.id;
    this.brokerService.editStock({
      id,
      name: form.value.stockName,
      distributionLaw: form.value.stockDistributionLaw,
      maxToChange: form.value.stockMaxToChange,
      startPrice: form.value.stockStartPrice,
    })
      .then(()=> {location.reload()});
  }

  closeForm(){
    this.brokerService.closeEditStock();
  }
}
