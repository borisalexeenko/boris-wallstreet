import { Component, OnInit, Input } from '@angular/core';
import {Broker, BrokersService} from "../shared/brokers.service";

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css']
})
export class BrokersComponent implements OnInit {
  @Input() brokers: Broker[] = []

  constructor(private brokerService: BrokersService){}

  ngOnInit(): void {
    this.brokerService.getBrokers().subscribe(data => {
        for (const [id, obj] of Object.entries(data)) {
          this.brokers.push(new Broker(id, obj.name, Number(obj.resources), obj.imageURL))
        }
        console.log(this.brokers)
      }
    );
  }

  showAddBrokerForm() {
    console.log('showing!!!');
    this.brokerService.handleAddBrokerForm();
  }

  removeBroker(broker: Broker) {
    this.brokerService.removeBroker(broker)
      .then(() => {location.reload()});
  }

  editBroker(broker: Broker) {
    this.brokerService.showEditBroker(broker);
  }
}
