// src/entities/Player.js
export class Player {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.speed = 30; // Aumentamos la velocidad para que el movimiento sea obvio
        this.width = 64;
        this.height = 64;
    }

    // El método ahora devuelve la nueva posición para que React la use
    mover(dir, limiteW, limiteH) {
        if (dir === 'up' && this.y > 0) this.y -= this.speed;
        if (dir === 'down' && this.y < limiteH - 150) this.y += this.speed;
        if (dir === 'left' && this.x > 0) this.x -= this.speed;
        if (dir === 'right' && this.x < limiteW - 64) this.x += this.speed;

        return { x: this.x, y: this.y };
    }
}