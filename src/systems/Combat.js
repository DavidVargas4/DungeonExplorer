/**
 * Clase Combat: colisiones y el daño entre entidades.
 */
export class Combat {
    /**
     * Verifica si el jugador está lo suficientemente cerca para atacar a un enemigo.
     * @param {Player} jugador 
     * @param {Enemy} enemigo 
     */
    static verificarAtaque(jugador, enemigo) {
        if (!enemigo || !enemigo.vivo) return false;

        // Cálculo de distancia euclidiana entre Kael y el Enemigo
        const dx = jugador.x - enemigo.x;
        const dy = jugador.y - enemigo.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        // Rango de la espada de Kael (60 píxeles aprox)
        const rangoAtaque = 60;

        if (distancia < rangoAtaque) {
            console.log("¡Golpe certero!");
            enemigo.recibirDaño(1); 
            return true;
        }
        return false;
    }

    /**
     * Verifica si el enemigo ha tocado al jugador (daño por contacto).
     */
    static verificarDañoJugador(jugador, enemigo) {
        if (!enemigo || !enemigo.vivo) return false;

        const dx = jugador.x - enemigo.x;
        const dy = jugador.y - enemigo.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        // Si el enemigo toca a Kael (distancia menor a 40)
        if (distancia < 40) {
            jugador.recibirDaño(1); 
            return true;
        }
        return false;
    }
}