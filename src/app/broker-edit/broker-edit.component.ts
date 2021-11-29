import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {BrokerDTO, BrokersService} from "../shared/brokers.service";


@Component({
  selector: 'app-broker-edit',
  templateUrl: './broker-edit.component.html',
  styleUrls: ['./broker-edit.component.css']
})
export class BrokerEditComponent implements OnInit {

  isShown: Boolean;
  formData: BrokerDTO;
  constructor(private brokerService: BrokersService) { }

  ngOnInit(): void {
    this.brokerService.currentBrokerEditModalState.subscribe(v => {
      this.isShown = v;
    })
    this.brokerService.currentBrokerEditState.subscribe(v => {
      this.formData = v;
    })
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(this.formData);
    let id = this.formData.id;
    this.brokerService.editBroker({
      id,
      name: form.value.brokerName,
      resources: form.value.brokerResource,
      imageURL: form.value.brokerImageURL,
    })
      .then(
        () => {location.reload()}
      );
  }

  close() {
    this.brokerService.closeEdit();
  }

}
