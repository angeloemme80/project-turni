import { Component, OnInit } from '@angular/core';
import { CalendarioServiceService } from '../servizi/calendario-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private calendarioService:CalendarioServiceService) {}

  millisecondi:number = 100;
  mesi:string[] = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
  
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

}
