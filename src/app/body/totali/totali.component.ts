import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CalendarioServiceService } from 'src/app/servizi/calendario-service.service';

@Component({
  selector: 'app-totali',
  templateUrl: './totali.component.html',
  styleUrls: ['./totali.component.scss']
})
export class TotaliComponent implements OnInit, AfterViewInit{

  constructor(private calendarioService:CalendarioServiceService) { }

  ngOnInit(): void {
    //console.log(this.persona);
    //console.log(this.tipologia);
  }
  
  @Input() persona:string = "";
  @Input() tipologia:string = "";
  @ViewChild('marcato') marcato: ElementRef = new ElementRef(this);

  ngAfterViewInit() {
    //console.log(this.marcato.nativeElement.innerHTML);
    //this.marcato.nativeElement.innerHTML = "<b>ciaoooooo</b>";
    this.marcato.nativeElement.setAttribute('nome',this.persona);
    this.marcato.nativeElement.setAttribute('tipologia',this.tipologia);
    //Aggiungo nel service all'array degli elementRef l'elemento appena marcato con le proprietà 'nome' e 'tipologia'
    this.calendarioService.totaliElementRef.push(this.marcato);
  }

}
