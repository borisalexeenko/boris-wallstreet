import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

export interface BrokerDTO {
  id?: string;
  name?: string;
  resources?: number;
  imageURL?: string;
}

export interface StockDTO {
  id?: string;
  name?: string;
  distributionLaw?: string;
  maxToChange?: number;
  startPrice?: number;
}

export class Broker {
  id: string;
  name: string;
  resources: number;
  imageURL: string;
  constructor(id: string, name: string, resource: number, imageURL: string) {
    this.id = id;
    this.name = name;
    this.resources = resource;
    this.imageURL = imageURL;
  }
}

export class Stock {
  id: string;
  name: string;
  distributionLaw: string;
  maxToChange: number;
  startPrice: number;
  constructor(id: string, name: string, distributionLaw: string, maxToChange: number, startPrice: number) {
    this.id = id;
    this.name = name;
    this.distributionLaw = distributionLaw;
    this.maxToChange = maxToChange;
    this.startPrice = startPrice;
  }
}

@Injectable({
  providedIn: "root"
})
export class BrokersService {
  constructor(private http: HttpClient) {}

  public brokers: Broker[] = [];
  public stocks: Stock[] = []
  /** Форма для добавления брокера
   * */
  private currentBrokerFormOpen: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  public currentBrokerFormOpenState: Observable<any> = this.currentBrokerFormOpen.asObservable();
  /** Добавлемый брокера
   * */
  private currentBroker: BehaviorSubject<Object> = new BehaviorSubject<Object>({
    name: '',
    resources: '',
    imageURL: '',
  })
  public currentBrokerState: Observable<any> = this.currentBroker.asObservable();

  /** Модальное окно для редактирования брокера
   * */
  private currentBrokerEditModal: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  public currentBrokerEditModalState: Observable<any> = this.currentBrokerEditModal.asObservable();

  /** Редактируемый брокер
   * */
  private currentBrokerEdit: BehaviorSubject<Object> = new BehaviorSubject<Object>({
    name: '',
    resources: '',
    imageURL: '',
  })
  public currentBrokerEditState: Observable<any> = this.currentBrokerEdit.asObservable();

  /** Добавление акции
   * */
  private currentStockFormOpen: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  public currentStockFormStockState: Observable<any> = this.currentStockFormOpen.asObservable();

  private currentStock: BehaviorSubject<Object> = new BehaviorSubject<Object>({
    name: '',
    distributionLaw: '',
    maxToChange: '',
    startPrice: '',
  })
  public currentStockState: Observable<any> = this.currentStock.asObservable();

  /** Модальное окно для редактирования акции
   * */
  private currentStockEditModal: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  public currentStockEditModalState: Observable<any> = this.currentStockEditModal.asObservable();

  /** Редактируемая акция
   * */
  private currentStockEdit: BehaviorSubject<Object> = new BehaviorSubject<Object>({
    name: '',
    resources: '',
    imageURL: '',
  })
  public currentStockEditState: Observable<any> = this.currentStockEdit.asObservable();


  /** Настройки биржи
   * */
  private currentParams: BehaviorSubject<Object> = new BehaviorSubject<Object>({});
  public paramsState: Observable<any> = this.currentParams.asObservable();

  getParams() {
    this.http.get('http://localhost:3000/get_params').subscribe( data => {
      this.currentParams.next(data);
    })
  }

  async saveParams(params: Object) {
    console.log(params);
    this.http.post('http://localhost:3000/set_params', params).subscribe(data => {
      console.log(data);
    })
  }

  getBrokers() {
    return this.http.get<Broker[]>('http://localhost:3000/get_brokers');
  }

  handleAddBrokerForm() {
    this.currentBrokerFormOpen.next(true);
  }

  handleAddStockForm() {
    this.currentStockFormOpen.next(true);
  }

  async addBroker(newBroker: Broker) {
    console.log(newBroker)
    this.brokers.push(newBroker);
    return this.http.post<Broker>('http://localhost:3000/add_broker', newBroker).subscribe(data => {
      console.log(data);
    });
  }

  async addStock(newStock: Stock) {
    this.stocks.push(newStock);
    console.log(newStock);
    this.http.post<Stock>('http://localhost:3000/add_stock', newStock).subscribe(data => {
       console.log(data);
    })
  }

  async removeBroker(broker: Broker) {
    console.log(broker);
    return this.http.get(`http://localhost:3000/remove_broker/${broker.id}`).subscribe(data => {
      console.log(data);
    })
  }

  async removeStock(stock: Stock) {
    return this.http.get(`http://localhost:3000/remove_stock/${stock.id}`).subscribe(data => {
      console.log(data)
    })
  }

  showEditBroker(broker: BrokerDTO) {
    this.currentBrokerEditModal.next(true);
    this.currentBrokerEdit.next(broker);
  }

  async editBroker(broker: BrokerDTO) {
    console.log(broker);
    this.currentBrokerEditModal.next(false);
    this.currentBrokerEdit.next({});
    return this.http.post(`http://localhost:3000/edit_broker/`, broker).subscribe(data => {
      console.log(data)
    });
  }

  showEditStock(stock: StockDTO){
    this.currentStockEditModal.next(true);
    this.currentStockEdit.next(stock);
  }

  closeEditStock() {
    this.currentStockEditModal.next(false);
    this.currentStockEdit.next({});
  }

  async editStock(stock: StockDTO) {
    console.log(stock);
    this.currentStockEditModal.next(false);
    this.currentStockEdit.next(stock);
    return this.http.post('http://localhost:3000/edit_stock', stock).subscribe(data => {
      console.log(data);
    })
  }

  closeBrokerForm() {
    this.currentBrokerFormOpen.next(false);
    this.currentBroker.next({
      name: '',
      resources: '',
      imageURL: ''
    });
  }

  closeEdit() {
    this.currentBrokerEditModal.next(false);
    this.currentBrokerEdit.next({
      name: '',
      resources: '',
      imageURL: ''
    });
  }

  getStocks () {
    return this.http.get<Stock []>('http://localhost:3000/get_stocks/')
  }

  closeFormStock() {
    this.currentStockFormOpen.next(false);
    this.currentStock.next({
      name: '',
      distributionLaw: '',
      maxToChange: '',
      startPrice: '',
    })
  }

}
