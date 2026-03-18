import { Sprites } from '../../constants/sprites';
import { HashTable } from '../structures/HashTable';
import { Room } from './Room';

export class Dungeon {
    constructor() {
        this.salas = new HashTable();
        this.generarMazmorra();
    }

    generarMazmorra() {
        const s1 = new Room(
            "inicio", 
            "Catacumbas Olvidadas", 
            Sprites.world.exterior, 
            "Nota del Padre: Kael, el Corazón no fue corrompido por accidente..."
        );

        const s2 = new Room(
            "pasillo", 
            "Bosque de Hyrule", 
            Sprites.world.pasillo
        );

        // [Norte, Sur, Oeste, Este]
        s1.conexiones = ["pasillo", null, null, null];
        s2.conexiones = [null, "inicio", null, null];

        this.salas.put(s1.id, s1);
        this.salas.put(s2.id, s2);
    }

    obtenerSala(id) {
        return this.salas.get(id);
    }
}