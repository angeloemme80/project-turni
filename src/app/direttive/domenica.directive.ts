import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';
import { CalendarioServiceService } from '../servizi/calendario-service.service';

/*
Direttiva che cambia il colore di sfondo alle celle Domenica oppure festivi
*/

@Directive({
  selector: '[appDomenica]'
})
export class DomenicaDirective {

  constructor(private calendarioService:CalendarioServiceService) {
  }

  @Input() giorno:number = 0;
  @HostBinding('style.background') backgroundColor = '';

  ngOnInit(): void {
    const data = new Date(this.calendarioService.getHeaderAnno(), this.calendarioService.getHeaderMese(), this.giorno);
      if( data.getDay() === 0 || this.calendarioService.isFestivo(this.calendarioService.getHeaderAnno(), this.calendarioService.getHeaderMese(), this.giorno ) ){
        //console.log(this.giorno);
        this.backgroundColor = '#99CBFF';
      }
  }
  

}
