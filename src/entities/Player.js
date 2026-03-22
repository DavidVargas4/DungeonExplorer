import React from 'react';
import { Image, View } from 'react-native'; 
import { Inventory } from '../systems/Inventory';

export class Player {
    constructor(x, y, spriteSheet) {
        this.x = x;
        this.y = y;
        this.spriteSheet = spriteSheet;
        this.frameWidth = 90;  
        this.frameHeight = 90; 
        this.frameX = 0; 
        this.frameY = 0;        
        this.vida = 3;
        this.inventario = new Inventory();
        this.estado = 'idle';
    }

    animar() {
        this.frameX = (this.frameX + 1) % 6; 
    }

    recibirDaño(cantidad) { 
        this.vida -= cantidad;
        if (this.vida < 0) this.vida = 0;
    }

    mover(dir, screenWidth, screenHeight) {
        this.estado = 'walk';
        const paso = 20; 

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

        // Límites de pantalla
        if (this.x < -20) this.x = -20;
        if (this.y < 0) this.y = 0;
        if (this.x > screenWidth - 40) this.x = screenWidth - 40;
        if (this.y > screenHeight - 100) this.y = screenHeight - 100;
    }

    detener() {
        this.estado = 'idle';
        this.frameX = 0;
    }

    render() {
        if (!this.spriteSheet) {
            return <View style={{position:'absolute', left:this.x, top:this.y, width:60, height:60, backgroundColor:'blue'}} />;
        }

        return (
            <View 
                key="player_main"
                style={{
                    position: 'absolute',
                    left: this.x,
                    top: this.y,
                    width: 84, 
                    height: 84, 
                    overflow: 'hidden', 
                    zIndex: 100, 
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