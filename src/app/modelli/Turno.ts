export class Turno {
  name: string;
  giorno:number;
  mese:number;
  anno:number;
  valori:string[];

  constructor(name:string, giorno:number, mese:number, anno:number, valori:string[]) {
    this.name = name;
    this.giorno = giorno;
    this.mese = mese;
    this.anno = anno;
    this.valori = valori;
  }
}