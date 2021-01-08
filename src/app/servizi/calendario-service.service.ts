import { EventEmitter, Injectable } from '@angular/core';
import { Turno } from 'src/app/modelli/Turno';

@Injectable({
  providedIn: 'root'
})
export class CalendarioServiceService {

  constructor() { }

  private headerAnno:number = 0;
  private headerMese:number = 0;
  annoChange: EventEmitter<number> = new EventEmitter();
  meseChange: EventEmitter<number> = new EventEmitter();
  calendarioVisible: EventEmitter<boolean> = new EventEmitter();
  personale:string[] = ['dr. Infranzi M.','dr. Sartori A.','dr. Cirino A.','dr. Bisogno E.','dr. Canero A.','dr. Mazzei C.','dr. Rescigno C.','dr. Russo M.'];
  tipologie:string[] = ['Presenze','Notti','Sale operatorie','Ore festive S/D','Ore reperibilità totali','Fine settimana liberi S/D'];
  tipiTurno: string[] = ['M', 'P', 'N', 'R', 'R2', 'R3', 'R12', 'MAL', 'LO'];
  listaTurni:Turno[] = [];
  

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
