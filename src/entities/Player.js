export class Player {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.speed = 30; 
        this.width = 64;
        this.height = 64;
    }

    mover(dir, limiteW, limiteH) {
        if (dir === 'up' && this.y > 0) this.y -= this.speed;
        if (dir === 'down' && this.y < limiteH - 150) this.y += this.speed;
        if (dir === 'left' && this.x > 0) this.x -= this.speed;
        if (dir === 'right' && this.x < limiteW - 64) this.x += this.speed;

        return { x: this.x, y: this.y };
    }

    recibirDaño(cantidad) { 
        this.vida -= cantidad;
        if (this.vida < 0) this.vida = 0;
    }

    mover(dir, screenWidth, screenHeight) {
        this.estado = 'walk';
        const paso = 15; 

        if (dir === 'up') {
            this.y -= paso;
            this.frameY = 3; 
        }
        if (dir === 'down') {
            this.y += paso;
            this.frameY = 0; 
        }
        if (dir === 'left') {
            this.x -= paso;
            this.frameY = 1;
        }
        if (dir === 'right') {
            this.x += paso;
            this.frameY = 2; 
        }

        this.animar();

        if (this.x < -20) this.x = -20; // Permite salir un poco por la izquierda
        if (this.y < 0) this.y = 0;
        if (this.x > screenWidth - 40) this.x = screenWidth - 40; 
        
        if (this.y > screenHeight - this.frameHeight) this.y = screenHeight - this.frameHeight;
    }

    detener() {
        this.estado = 'idle';
        this.frameX = 0; 
    }

    render() {
    if (!this.spriteSheet) return <View style={{position:'absolute', left:this.x, top:this.y, width:50, height:50, backgroundColor:'blue'}} />;

    return (
        <View 
            key="player_container"
            style={{
                position: 'absolute',
                left: this.x,
                top: this.y,
                width: 84, 
                height: 84,
                overflow: 'hidden', 
                zIndex: 500, 
            }}
        >
            <Image
                source={this.spriteSheet}
                style={{
                    width: 504, 
                    height: 336,
                    marginLeft: -(this.frameX * 84),
                    marginTop: -(this.frameY * 84),
                }}
                resizeMode="stretch" 
            />
        </View>
    );
}
}