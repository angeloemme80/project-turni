import { Component, Input, OnInit } from '@angular/core';
import { CalendarioServiceService } from '../servizi/calendario-service.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  visibile:boolean = true;

  constructor(private calendarioService:CalendarioServiceService) {
  }

  ngOnInit(): void {
    
    //Subscribe del calendarioVisible
    this.calendarioService.calendarioVisible.subscribe((parVisibile:boolean) => {
      this.visibile = parVisibile;
    });    

  }

}
