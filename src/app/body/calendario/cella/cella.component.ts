import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Turno } from 'src/app/modelli/Turno';
import { CalendarioServiceService } from 'src/app/servizi/calendario-service.service';

@Component({
  selector: 'app-cella',
  templateUrl: './cella.component.html',
  styleUrls: ['./cella.component.scss']
})
export class CellaComponent implements OnInit {

  constructor(public elementRef: ElementRef, private calendarioService:CalendarioServiceService) { 
    //this.elementRef.nativeElement.classList.remove('mat-form-field-appearance-legacy');
  }

  turni = new FormControl();
  tipiTurno: string[] = this.calendarioService.tipiTurno;
  turniSelezionati: string[] = [];  
  @Input() giorno:number = 0;
  @Input() persona:string = "";
  

  ngOnInit(): void {
    //console.log("onInit "+this.persona + " - " + this.turni.value + " - " + this.calendarioService.getHeaderAnno() + " - " + this.calendarioService.getHeaderMese());
    const turno = new Turno(this.persona, this.giorno, this.calendarioService.getHeaderMese(), this.calendarioService.getHeaderAnno(), this.turni.value);
    this.calendarioService.listaTurni.push(turno);
  }

  onSelectionChange(){
    //console.log(this.turni.value);
    //console.log(this.giorno);
    //console.log(this.persona);
    //Rimuovo tutti gli elementi dell'array e lo popolo con quelli appena scelti
    this.turniSelezionati.splice(0, this.turniSelezionati.length, this.turni.value);
    
    //Filtro il turno in base al nome giorno mese e anno per aggiungerci i turni selezionati
    let filtrato:Turno[] = this.calendarioService.listaTurni.filter( x => {
      return x.name.includes(this.persona) && x.giorno===this.giorno && x.mese===this.calendarioService.getHeaderMese() && x.anno===this.calendarioService.getHeaderAnno();
    });
    filtrato[0].valori = this.turniSelezionati;
    //console.log("filtrato: " + JSON.stringify(filtrato));

    //Sostituisco nell'array completo quello filtrato che contiene i nuovi turni selezionati
    this.calendarioService.listaTurni.map(obj => {
      filtrato.find(o => (o.name === obj.name && o.giorno === obj.giorno && o.mese===obj.mese && o.anno===obj.anno ) || obj)
    });
    //console.log(this.calendarioService.listaTurni);
    
    //Invoco il metodo che effettua i calcoli in base all'array appana calcolato (this.calendarioService.listaTurni)
    this.calendarioService.calcolaTotali(this.calendarioService.listaTurni)
  }

}
