import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cella',
  templateUrl: './cella.component.html',
  styleUrls: ['./cella.component.scss']
})
export class CellaComponent {

  toppings = new FormControl();
  toppingList: string[] = ['M', 'P', 'N', 'R', 'R2', 'R3', 'R12', 'MAL', 'LO'];

  constructor() { }

  

}
