import { Component, OnInit } from '@angular/core';
import { CalendarioServiceService } from '../servizi/calendario-service.service';
import { HttpClient } from '@angular/common/http';
import { Turno } from '../modelli/Turno';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private calendarioService:CalendarioServiceService, private http: HttpClient) {}

  millisecondi:number = 100;
  mesi:string[] = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
  popup = false;
  testoMessaggio:string = '';
  titoloMessaggio:string = '';
  errore = false;
  
  ngOnInit(): void {
    this.calendarioService.setHeaderAnno(this.getAnnoCorrente());
    this.calendarioService.setHeaderMese(new Date().getMonth());
  }
  
  getAnnoCorrente(){
    //var d:Date = new Date();
    //console.log(this.mesi[d.getMonth()]);
    return new Date().getFullYear();
  }

  isMeseCorrente(i:number){
    return new Date().getMonth() === i;
  }

  onInputAnno(valore:string){
    //console.log('dentro on input: ' + valore);
    //this.calendarioService.headerAnno(valore);
    this.calendarioService.setHeaderAnno(parseInt(valore));
    this.refreshComponenteCalendario(); 
  }

  onInputMese(valore:string){
    this.calendarioService.setHeaderMese(parseInt(valore));
    //console.log(' this.calendarioService.getHeaderMese(): ' + this.calendarioService.getHeaderMese() );
    this.refreshComponenteCalendario(); 
  }

  refreshComponenteCalendario(){
    //prima ripulisco il component calendario e dopo n millisecondi lo riabilito
    this.calendarioService.calendarioVisible.emit(false);
    setTimeout(()=>{
      this.calendarioService.calendarioVisible.emit(true);
    }, this.millisecondi);
  }

  salva(){
    return this.http.post(
      "http://www.angelomassaro.it/rest/saveTurni.php",
      this.calendarioService.listaTurni
    ).subscribe(
      result => {
        this.errore = false;
        this.testoMessaggio = 'Salvataggio avvenuto con successo!';
        this.popup = true;
      },
      error => {
        this.testoMessaggio = 'ATTENZIONE: Errore durante il salvataggio!';
        this.popup = true;
        this.errore = true;
        console.log("Errore: " + error);
      },
      () => {
        this.titoloMessaggio = 'Salvataggio';
      }
    );
  }

  carica(){
    //TODO caricare il file json dal server
    return this.http.get<Turno[]>(
      "http://www.angelomassaro.it/rest/getTurni.php?anno=" + this.calendarioService.getHeaderAnno() + "&mese=" + this.calendarioService.getHeaderMese()
    ).subscribe(
      result => {
        this.errore = false;
        let listaTurni:Turno[]=[];
        result.forEach( (turno,indice) => {
          //console.log(turno);
          listaTurni.push( new Turno(turno.name,turno.giorno,turno.mese,turno.anno,turno.valori) );
        })
        this.calendarioService.listaTurni = listaTurni;
        //console.log(this.calendarioService.listaTurni);
        this.calendarioService.loadData.emit(this.calendarioService.listaTurni);//emetto l'evento di caricamento dei valori nel calendario
      },
      error => {
        this.testoMessaggio = "ATTENZIONE: Errore durante l'apertura del file!";
        this.popup = true;
        this.errore = true;
        console.log("Errore: " + error);
      },
      () => {
        this.titoloMessaggio = 'Caricamento dati';
      }
    );
  }

}
