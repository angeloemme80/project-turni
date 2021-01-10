export class Totale {
    name: string;
    presenze: number;
    notti: number;
    saleOperatorie: number;
    oreFestive: number;
    oreReperibilita: number;
    fineSettimanaLiberi: number;


    constructor(name:string, presenze:number, notti:number, saleOperatorie:number, oreFestive:number, oreReperibilita:number, fineSettimanaLiberi:number,) {
      this.name = name;
      this.presenze = presenze;
      this.notti = notti;
      this.saleOperatorie = saleOperatorie;
      this.oreFestive = oreFestive;
      this.oreReperibilita = oreReperibilita;
      this.fineSettimanaLiberi = fineSettimanaLiberi;
    }
  }