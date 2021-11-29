import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Broker, BrokersService} from "../shared/brokers.service";
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-broker-form',
  templateUrl: './broker-form.component.html',
  styleUrls: ['./broker-form.component.css']
})
export class BrokerFormComponent implements OnInit {

  isShown: Boolean;
  formData: Broker;

  constructor(private brokerService: BrokersService) {
  }

  ngOnInit(): void {
    this.brokerService.currentBrokerFormOpenState.subscribe(v => {
      this.isShown = v;
    });
    this.brokerService.currentBrokerState.subscribe(v => {
      this.formData = v;
    })
  }


  closeForm() {
    this.brokerService.closeBrokerForm();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.brokerService.addBroker(
      new Broker(uuid(), form.value.brokerName, Number(form.value.brokerResource), form.value.brokerImageURL)
    )
      .then(() => {location.reload()});
  }

}
