export class Pelicula {
    id! : string;
    nombre : string;
    fechaDeEstreno : Date;
    publico : number;
    foto : string;
    actor : string;
    tipo: TipoDePelicula;

    public get fecha() : string {
        return this.fechaDeEstreno.toLocaleDateString();
    }

    public set fecha(value : string) {
        this.fechaDeEstreno = new Date(value);
    }

    public get tipoString() : string {
        return TipoDePelicula[this.tipo];
    }

    constructor(id: string, nombre: string, tipo: TipoDePelicula, fechaDeEstreno: Date, publico: number, foto: string, actor: string) {
        if (id) {
            this.id = id;
        }
        this.nombre = nombre;
        this.tipo = tipo;
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
