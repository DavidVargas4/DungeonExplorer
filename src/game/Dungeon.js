import { Room } from './Room.js';

export class Dungeon {
    constructor() {
        this.salas = new Map(); // Esto actuará como tu Grafo
        this.generarMazmorra();
    }

    generarMazmorra() {
        // Creas las salas (Aquí pondrás las rutas a tus imágenes después)
        const entrada = new Room("inicio", "Entrada de la Mazmorra", "assets/rooms/entrada.png");
        const pasillo = new Room("pasillo", "Pasillo Sombrío", "assets/rooms/pasillo.png");

        // Creas las conexiones (Grafo)
        entrada.conexiones = ["pasillo"];
        pasillo.conexiones = ["inicio"];

        // Guardas en el mapa
        this.salas.set(entrada.id, entrada);
        this.salas.set(pasillo.id, pasillo);
    }

    obtenerSala(id) {
        return this.salas.get(id);
    }
}