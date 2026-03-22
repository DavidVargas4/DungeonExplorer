import { LinkedList } from '../structures/LinkedList';

/**
 * Clase Inventory: Gestiona los objetos recolectados por Kael.
 * REQUISITO TÉCNICO: Implementación manual de estructuras (LinkedList).
 */
export class Inventory {
    constructor() {
        // Inicializamos la lista enlazada manual
        this.items = new LinkedList();
        this.capacidadMaxima = 10;
        this.cantidadActual = 0;
    }

    /**
     * Agrega un ítem al inventario si hay espacio.
     * @param {string} nombreItem 
     */
    agregarItem(nombreItem) {
        if (this.cantidadActual < this.capacidadMaxima) {
            this.items.add(nombreItem);
            this.cantidadActual++;
            console.log(`¡${nombreItem} guardado en el zurrón!`);
            return true;
        } else {
            console.log("Inventario lleno. ¡Manejo de errores!");
            return false;
        }
    }

    /**
     * Obtiene la lista convertida en array para que React la pueda dibujar.
     */
    obtenerLista() {
        return this.items.toArray();
    }
}