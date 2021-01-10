import { Component, OnDestroy, OnInit } from '@angular/core';
import { Totale } from 'src/app/modelli/Totale';
import { CalendarioServiceService } from 'src/app/servizi/calendario-service.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit, OnDestroy {

  constructor(private calendarioService:CalendarioServiceService) { }

  giorni:number[] = [];
  personale:string[] = this.calendarioService.personale;
  tipologie:string[] = this.calendarioService.tipologie;
  listaTotali:Totale[] = this.calendarioService.listaTotali;
  

  ngOnInit(): void {
    //Passo anno e mese dal service calendarioServiceService
    this.generaRigaDeiGiorni(this.calendarioService.getHeaderMese(), this.calendarioService.getHeaderAnno());

    //Subscribe dell'anno
    this.calendarioService.annoChange.subscribe((parAnno:number) => {
      this.generaRigaDeiGiorni(this.calendarioService.getHeaderMese(), parAnno);
    });

    //Subscribe del mese
    this.calendarioService.meseChange.subscribe((parMese:number) => {
      this.generaRigaDeiGiorni(parMese, this.calendarioService.getHeaderAnno());
    });

    //Subscribe lista dei totali
    this.calendarioService.listaTotaliChange.subscribe((lista:Totale[]) => {
      this.listaTotali = lista;
    });

  }

  generaRigaDeiGiorni(anno:number, mese:number){
    for (let index = 1; index <= this.getDaysInMonth(this.calendarioService.getHeaderMese(), this.calendarioService.getHeaderAnno()); index++) {
      this.giorni.push(index);
    }
  }

  ngOnDestroy(){
    this.calendarioService.listaTurni = [];
    this.calendarioService.totaliElementRef = [];
    this.calendarioService.listaTotali = [];
    console.log('destroyyyyyyyyyyyy');
  }

  getDaysInMonth(month:number, year:number) {
    return new Date(year, month+1, 0).getDate();
  }

}
