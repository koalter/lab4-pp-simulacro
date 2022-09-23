export class Actor {
    nombre: string;
    apellido: string;
    fechaDeNacimiento: Date;
    nacionalidad: string;

    constructor(nombre: string, apellido: string, fechaDeNacimiento: string, nacionalidad: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaDeNacimiento = new Date(fechaDeNacimiento);
        this.nacionalidad = nacionalidad;
    }
}
