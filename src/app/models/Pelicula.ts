export class Pelicula {
    id! : string;
    nombre : string;
    fechaDeEstreno : Date;
    publico : number;
    foto : string;
    actor : string;
    private _tipo: number;

    
    public get tipo() : string {
        return TipoDePelicula[this._tipo];
    }
    

    constructor(nombre: string, tipo: number, fechaDeEstreno: Date, publico: number, foto: string, actor: string) {
        this.nombre = nombre;
        this._tipo = tipo;
        this.fechaDeEstreno = fechaDeEstreno;
        this.publico = publico;
        this.foto = foto;
        this.actor = actor;
    }
}

export enum TipoDePelicula {
    terror = 0,
    comedia = 1,
    amor = 2,
    otros = 3
}
