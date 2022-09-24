export class Actor {
    nombre: string;
    apellido: string;
    fechaDeNacimiento: Date;
    nacionalidad: string;

    constructor(nombre: string, apellido: string, fechaDeNacimiento: Date, nacionalidad: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaDeNacimiento = fechaDeNacimiento;
        this.nacionalidad = nacionalidad;
    }
}
