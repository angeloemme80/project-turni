import { ElementRef, EventEmitter, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Turno } from 'src/app/modelli/Turno';
import { Totale } from '../modelli/Totale';

@Injectable({
  providedIn: 'root'
})
export class CalendarioServiceService {

  constructor() {
    this.loadData.subscribe( (lista:Turno[] ) => {//Subscribe del caricamento dei dati dal server
      this.listaFormControl.forEach( (element,indice) => {
        element.setValue( lista[indice].valori!=null? lista[indice].valori[0] : []);
      })
    });
  }

  private headerAnno:number = 0;
  private headerMese:number = 0;
  annoChange: EventEmitter<number> = new EventEmitter();
  meseChange: EventEmitter<number> = new EventEmitter();
  calendarioVisible: EventEmitter<boolean> = new EventEmitter();
  giorniFestivi:{m:number, g:number}[] = [ {m:0,g:1},{m:0,g:6},{m:3,g:25},{m:4,g:1},{m:5,g:2},{m:7,g:15},{m:10,g:1},{m:11,g:8},{m:11,g:25},{m:11,g:26},{m:11,g:31},{m:8,g:8} ];//Il mese inizia da 0 (gennaio quindi = 0)
  personale:string[] = ['dr. Infranzi M.','dr. Sartori A.','dr. Cirino A.','dr. Bisogno E.','dr. Canero A.','dr. Mazzei C.','dr. Rescigno C.','dr. Russo M.'];
  tipologie:string[] = ['Presenze','Notti','Sale operatorie','Ore festive S/D','Ore reperibilità totali','Fine settimana liberi S/D'];
  tipiTurno: string[] = ['M', 'P', 'N', 'R', 'R2', 'R3', 'R12', 'MAL', 'LO'];
  listaTurni:Turno[] = [];
  listaFormControl:FormControl[] = [];
  listaTotali:Totale[] = [];
  listaTotaliChange: EventEmitter<Totale[]> = new EventEmitter();
  ggWeekEnd:number[] = [];
  loadData: EventEmitter<Turno[]> = new EventEmitter();

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
    //console.log(this.listaTotali);
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
    let ggWeekEndLavorati:number[] = [];

    arrayPersonale.t.forEach( element => {
      element.valori?.forEach( (v:string) => {
        let vSplittato:string[] = v.toString().split(",");        
        const data = new Date(element.anno, element.mese, element.giorno);
        if(data.getDay() === 6 && vSplittato.includes("MAL")==false && vSplittato.includes("LO")==false && vSplittato.includes("")==false && element.giorno != this.ultimoGiornoDelMese(element.mese, element.anno)){ //sabato tranne l'ultimo del mese
          ggWeekEndLavorati.push(element.giorno);
        }
        if(data.getDay() === 0 && vSplittato.includes("MAL")==false && vSplittato.includes("LO")==false && vSplittato.includes("")==false && element.giorno !=1 ){ //domenica tranne la prima del mese
          ggWeekEndLavorati.push(element.giorno);
        }        
        
        vSplittato.forEach( splittato => {
          //console.log("splittato: " + splittato);
          switch (splittato) {
            case "M":
              presenze+=1;
              if(data.getDay() === 2 || data.getDay() === 4){ //martedi oppure giovedi
                saleOperatorie+=1;
              }
              if(data.getDay() === 0 || data.getDay() === 6 || this.isFestivo(element.anno, element.mese, element.giorno)){ //sabato oppure domenica oppure festivo
                oreFestive+=6;
              }
              break;
            case "P":
              presenze+=1;
              if(data.getDay() === 0 || data.getDay() === 6 || this.isFestivo(element.anno, element.mese, element.giorno)){ //sabato oppure domenica
                oreFestive+=6;
              }
              break;
            case "N":
              presenze+=2;
              notti+=1;
              if(data.getDay() === 0 || data.getDay() === 6 || this.isFestivo(element.anno, element.mese, element.giorno)){ //sabato oppure domenica
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
              //console.log("Spiacenti, non abbiamo valori.");
          }
        });
        

      });
    });

    //differenza tra l'array dei gg dei weekend totali e quelli lavorati. Se ci sono giorni consecutivi allora significa che è un week end libero
    let difference = this.ggWeekEnd.filter(x => ggWeekEndLavorati.indexOf(x) === -1);
    //console.log(difference);
    difference.forEach( (valore, indice, tuttoLarray) => {
      //console.log("valore: " + valore + " - tuttoLarray[indice-1]: " + tuttoLarray[indice-1]);
      if( (valore-1) === tuttoLarray[indice-1]){
        fineSettimanaLiberi+=1;
      }
    });
    

    totale.presenze = presenze;
    totale.notti = notti;
    totale.saleOperatorie = saleOperatorie;
    totale.oreFestive = oreFestive;
    totale.oreReperibilita = oreReperibilita;
    totale.fineSettimanaLiberi = fineSettimanaLiberi;
    this.listaTotali.push(totale);
  }

  

  //Controlla se il giorno da controllare è festivo
  isFestivo(anno:number, mese:number, giorno:number ):boolean{
    const dataDaControllare:Date = new Date(anno, mese, giorno);
    //console.log("dataDaControllare: " + dataDaControllare);    
    //controllo su pasqua e pasquetta
    //console.log("Pasqua: " + this.calcoloPasqua(anno));
    
    
    const pasqua:Date = this.calcoloPasqua(anno);
    const pasquetta:Date = this.calcoloPasqua(anno);
    pasquetta.setDate(pasquetta.getDate() + 1);
    if( ( (dataDaControllare.getTime() - pasqua.getTime()) / (1000 * 60 * 60 * 24) ) === 0 
    || ( (dataDaControllare.getTime() - pasquetta.getTime()) / (1000 * 60 * 60 * 24) ) === 0 ){
      return true;
    }

    //controllo su giorni festivi
    let quanti:number = 0;
    this.giorniFestivi.forEach( festivo => {
      let da = new Date(anno, festivo.m, festivo.g);
      //console.log("DA: " + (dataDaControllare.getTime() - da.getTime()) / (1000 * 60 * 60 * 24));
      if( ( (dataDaControllare.getTime() - da.getTime()) / (1000 * 60 * 60 * 24) ) === 0 ){
        quanti+=1;
      }
    });
    if(quanti>0){
      return true;
    }
    

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

    return new Date (Y, M-1, D);
  }

  ultimoGiornoDelMese(mese:number, anno:number) :number {
    var d = new Date(anno, mese + 1, 0);
    //console.log("ultimo gg: " + d.getDate())
    return d.getDate();
  }
 

  
}
