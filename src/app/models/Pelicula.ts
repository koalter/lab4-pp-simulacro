export class Pelicula {
    id: number;
    nombre: string;
    tipo: TipoDePelicula;
    fechaDeEstreno: Date;
    publico: number;
    foto: string;

    constructor(nombre: string, tipo: TipoDePelicula|number, fechaDeEstreno: Date, publico: number, foto: string) {
        this.id = Date.now();
        this.nombre = nombre;
        this.tipo = tipo;
        this.fechaDeEstreno = fechaDeEstreno;
        this.publico = publico;
        this.foto = foto;
    }
}

export enum TipoDePelicula {
    terror = 0,
    comedia = 1,
    amor = 2,
    otros = 3
}
