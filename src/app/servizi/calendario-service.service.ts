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
  }

  calcolaByNome( arrayPersonale:{id:number, t:Turno[]} ) {
    //console.log(arrayPersonale);
    let totale = new Totale(arrayPersonale.t[0].name,0,0,0,0,0,0);//inizializzo l'oggetto
    let presenze:number = 0;
    let notti:number = 0;
    let saleOperatorie:number = 0;
    
    arrayPersonale.t.forEach( element => {
      element.valori?.forEach( (v:string) => {
        let vSplittato:string[] = v.toString().split(",");
        vSplittato.forEach( splittato => {
          //console.log("splittato: " + splittato);
          switch (splittato) {
            case "M":
              presenze+=1;
              break;
            case "P":
              presenze+=1;
              break;
            case "N":
              presenze+=2;
              notti+=1;
              break;
            case "R":
              console.log("Le ciliegie costano €2.59 al chilo.");
              break;
            case "R2":
              break;
            case "R3":
              console.log("I manghi e le papaye costano €1.79 al chilo.");
              break;
            case "R12":
              break;
            case "MAL":
              break;
            case "LO":
              break;
            default:
              console.log("Spiacenti, non abbiamo " + v + ".");
          }
        });
        

      });
    });
    totale.presenze = presenze;
    totale.notti = notti;
    this.listaTotali.push(totale);
    
  }

}
