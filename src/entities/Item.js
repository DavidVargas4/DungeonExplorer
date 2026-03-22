import React from 'react';
import { Image, View } from 'react-native';

/**
 * Clase Item: objetos recolectables en el suelo.
 */
export class Item {
    constructor(id, nombre, x, y, sprite) {
        this.id = id;
        this.nombre = nombre;
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.recogido = false; 
        this.width = 45;
        this.height = 45;
    }

    render() {
        if (this.recogido) return null; // No se dibuja si ya se recogió

        return (
            <View key={this.id} style={{ position: 'absolute', left: this.x, top: this.y, zIndex: 30 }}>
                <Image
                    source={this.sprite}
                    style={{ width: this.width, height: this.height }}
                    resizeMode="contain"
                />
            </View>
        );
    }
}