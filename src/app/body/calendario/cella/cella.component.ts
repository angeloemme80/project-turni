import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cella',
  templateUrl: './cella.component.html',
  styleUrls: ['./cella.component.scss']
})
export class CellaComponent implements OnInit {

  turni = new FormControl();
  listaTurni: string[] = ['M', 'P', 'N', 'R', 'R2', 'R3', 'R12', 'MAL', 'LO'];
  turniSelezionati: string[] = [];
  
  @Input()
  giorno:number = 0;

  constructor(public elementRef: ElementRef) { 
    this.elementRef.nativeElement.classList.remove('mat-form-field-appearance-legacy');
  }

  ngOnInit(): void {
    
  }

  onSelectionChange(){
    console.log(this.turni.value);
    console.log(this.giorno);
    //Rimuovo tutti gli elementi dell'array e lo popolo con quelli appena scelti
    this.turniSelezionati.splice(0, this.turniSelezionati.length, this.turni.value);
  }

}
