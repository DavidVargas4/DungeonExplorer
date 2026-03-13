export class Room {
    constructor(id, nombre, imagenUrl) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = new Image();
        this.imagen.src = imagenUrl; // Aquí pondrás la ruta de la imagen que descargues
        this.conexiones = []; // IDs de salas vecinas
    }

    dibujar(ctx) {
        // Si la imagen cargó, la dibuja. Si no, dibuja un fondo gris.
        if (this.imagen.complete) {
            ctx.drawImage(this.imagen, 0, 0, 800, 600);
        } else {
            ctx.fillStyle = "#333";
            ctx.fillRect(0, 0, 800, 600);
        }
        
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(this.nombre, 20, 40);
    }
}