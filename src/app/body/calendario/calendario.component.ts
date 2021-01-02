import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarioServiceService } from 'src/app/servizi/calendario-service.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit, OnDestroy {

  constructor(private calendarioService:CalendarioServiceService) { }

  giorni:number[] = [];
  personale:string[] = ['RUSSO M.','RESCIGNO','ANGELO','ANGELA','VITTORIA'];
  

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

  }

  generaRigaDeiGiorni(anno:number, mese:number){
    for (let index = 1; index <= this.getDaysInMonth(this.calendarioService.getHeaderMese(), this.calendarioService.getHeaderAnno()); index++) {
      this.giorni.push(index);
    }
  }

  ngOnDestroy(){
    console.log('destroyyyyyyyyyyyy');
  }

  getDaysInMonth(month:number, year:number) {
    return new Date(year, month+1, 0).getDate();
  }

}
