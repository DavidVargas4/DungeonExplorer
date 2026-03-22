import { LinkedList } from '../structures/LinkedList';

/**
 * Clase Room: cada escenario del juego.
 */
export class Room {
    constructor(id, nombre, imagen, nota = null) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.nota = nota; // El mensaje del padre de Kael
        this.conexiones = []; // IDs de salas conectadas [Atrás, Adelante]
        this.enemigos = new LinkedList();
        this.npcs = new LinkedList();
        this.items = new LinkedList(); 
    }

    agregarItem(item) {
        this.items.add(item);
    }

    agregarEnemigo(enemigo) {
        this.enemigos.add(enemigo);
    }

    agregarNPC(npc) {
        this.npcs.add(npc);
    }
}