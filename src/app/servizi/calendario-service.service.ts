import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarioServiceService {

  private headerAnno:number = 0;
  private headerMese:number = 0;
  annoChange: EventEmitter<number> = new EventEmitter();
  meseChange: EventEmitter<number> = new EventEmitter();
  calendarioVisible: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  getHeaderAnno():number{
    return this.headerAnno;
  }
  setHeaderAnno(value:number){
    this.headerAnno = value;
    this.annoChange.emit(value);
  }

  getHeaderMese():number{
    return this.headerMese;
  }
  setHeaderMese(value:number){
    this.headerMese = value;
    this.meseChange.emit(value);
  }

}
