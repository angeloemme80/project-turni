import { ElementRef, EventEmitter, Injectable } from '@angular/core';
import { Turno } from 'src/app/modelli/Turno';
import { Totale } from '../modelli/Totale';

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
  totaliElementRef:ElementRef[] = [];//Forse da eliminare
  listaTotali:Totale[] = [];
  listaTotaliChange: EventEmitter<Totale[]> = new EventEmitter();
  

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

  //metodo che effettua i calcoli in base all'array contenente i dati di tutto il calendario
  calcolaTotali(tuttiITurni:Turno[]){
    //console.log(tuttiITurni);
    //console.log(this.totaliElementRef);
    //TODO scorro tutti i turni e faccio i calcoli da inserire poi nei singoli elementi di totaliElementRef ottenendo quello corretto in base algli attributi 'nome' e 'tipologia'
    /*
    tuttiITurni.forEach(element => {
      console.log(element);
    });*/
    //per ogni elemento del personale creo un array di turni
    this.listaTotali = [];//Ripulisco loggetto
    let arrayPersonale:{id:number, t:Turno[]};
    this.personale.forEach( (element, index) => {
      let filtrato: Turno[] = tuttiITurni.filter((x) => {
        return x.name.includes(element);
      });
      //console.log(index);
      //console.log(filtrato);
      arrayPersonale = {id: index, t:filtrato};
      this.calcolaByNome(arrayPersonale);
    });
    console.log(this.listaTotali);
    this.listaTotaliChange.emit(this.listaTotali);
  }

  calcolaByNome( arrayPersonale:{id:number, t:Turno[]} ) {
    //console.log(arrayPersonale);
    let totale = new Totale(arrayPersonale.t[0].name,0,0,0,0,0,0);//inizializzo l'oggetto
    let presenze:number = 0;
    let notti:number = 0;
    let saleOperatorie:number = 0;
    let oreFestive:number = 0;
    let oreReperibilita:number = 0;
    let fineSettimanaLiberi:number = 0;
    
    arrayPersonale.t.forEach( element => {
      element.valori?.forEach( (v:string) => {
        let vSplittato:string[] = v.toString().split(",");
        const data = new Date(element.anno, element.mese, element.giorno);
        console.log( "DAY: " + data.getDay());
        vSplittato.forEach( splittato => {
          //console.log("splittato: " + splittato);
          switch (splittato) {
            case "M":
              presenze+=1;
              if(data.getDay() === 2 || data.getDay() === 4){ //martedi oppure giovedi
                saleOperatorie+=1;
              }
              if(data.getDay() === 0 || data.getDay() === 6 || this.isFestivo()){ //sabato oppure domenica
                oreFestive+=6;
              }
              break;
            case "P":
              presenze+=1;
              if(data.getDay() === 0 || data.getDay() === 6 || this.isFestivo()){ //sabato oppure domenica
                oreFestive+=6;
              }
              break;
            case "N":
              presenze+=2;
              notti+=1;
              if(data.getDay() === 0 || data.getDay() === 6 || this.isFestivo()){ //sabato oppure domenica
                oreFestive+=12;
              }
              break;
            case "R":
              oreReperibilita+=18;
              break;
            case "R2":
              oreReperibilita+=6;
              break;
            case "R3":
              oreReperibilita+=12;
              break;
            case "R12":
              oreReperibilita+=12;
              break;
            case "MAL":
              break;
            case "LO":
              break;
            default:
              console.log("Spiacenti, non abbiamo valori.");
          }
        });
        

      });
    });
    totale.presenze = presenze;
    totale.notti = notti;
    totale.saleOperatorie = saleOperatorie;
    totale.oreFestive = oreFestive;
    totale.oreReperibilita = oreReperibilita;
    totale.fineSettimanaLiberi = fineSettimanaLiberi;
    this.listaTotali.push(totale);
  }

  //TODO da completare
  isFestivo(){
    //console.log("Pasqua: " + this.calcoloPasqua(2022));
    return false;
  }
  calcoloPasqua(Y:number) {
    var C = Math.floor(Y/100);
    var N = Y - 19*Math.floor(Y/19);
    var K = Math.floor((C - 17)/25);
    var I = C - Math.floor(C/4) - Math.floor((C - K)/3) + 19*N + 15;
    I = I - 30*Math.floor((I/30));
    I = I - Math.floor(I/28)*(1 - Math.floor(I/28)*Math.floor(29/(I + 1))*Math.floor((21 - N)/11));
    var J = Y + Math.floor(Y/4) + I + 2 - C + Math.floor(C/4);
    J = J - 7*Math.floor(J/7);
    var L = I - J;
    var M = 3 + Math.floor((L + 40)/44);
    var D = L + 28 - 31*Math.floor(M/4);

    return this.padout(M) + '.' + this.padout(D);
  }
  padout(n:number) { 
    return (n < 10) ? '0' + n : n; 
  }

}
