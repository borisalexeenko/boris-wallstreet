import {Component, Input, OnInit} from '@angular/core';
import {Broker, BrokersService, Stock} from "../shared/brokers.service";

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  @Input() stocks: Stock[] = [];
  constructor(private brokerService: BrokersService) {
    this.brokerService.getStocks().subscribe(data => {
      console.log(data);
        for (const [id, obj] of Object.entries(data)) {
          this.stocks.push(new Stock(id, obj.name, obj.distributionLaw, Number(obj.maxToChange), Number(obj.startPrice)));
        }
        console.log(this.stocks)
      }
    );
  }

  ngOnInit(): void {
  }

  removeStock(stock: Stock) {
    this.brokerService.removeStock(stock)
      .then(() => {location.reload()});
  }

  showAddingForm(){
    this.brokerService.handleAddStockForm();
  }

  showEditForm(stock: Stock){
    this.brokerService.showEditStock(stock);
  }

  editStock(stock: Stock) {
    this.brokerService.showEditStock(stock);
  }
}
