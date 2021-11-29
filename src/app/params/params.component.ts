import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import {BrokersService} from "../shared/brokers.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.css']
})
export class ParamsComponent implements OnInit {

  start_time: string = '';
  end_time: string = '';
  time_out: string = '';

  constructor(private brokerService: BrokersService) {
    this.brokerService.paramsState.subscribe(v => {
        this.start_time = moment(new Date(v.start_time)).format('YYYY-MM-DDThh:mm');
        this.end_time = moment(new Date(v.end_time)).format('YYYY-MM-DDThh:mm');
        const dur = moment.duration(parseInt(v.time_out));
        this.time_out = this.addZero(dur.hours().toString() + ":" + this.addZero(dur.minutes().toString())
        + this.addZero(dur.seconds().toString()));
      })
  }

  ngOnInit(): void {
  }

  addZero (t: string) {
    if(t.length < 2) {
      return "0" + t;
    }
    return t;
  }

  getCurrentTime() {
    return moment(new Date()).format('YYYY-MM-DDThh:mm');
  }

  parseTime(t: string) {
    const keys = t.split(":");
    return parseInt(keys[0]) * 3600000 + parseInt(keys[1]) * 60000;
  }

  onSubmit(form: NgForm) {
    console.log(form.value.timeout)
    this.brokerService.saveParams({
      start_time: moment(form.value.startDate, 'YYYY-MM-DDThh:mm').valueOf(),
      end_time: moment(form.value.endDate, 'YYYY-MM-DDThh:mm').valueOf(),
      time_out: this.parseTime(form.value.timeout)
    })
      .then(() => {location.reload()});
  }

}
