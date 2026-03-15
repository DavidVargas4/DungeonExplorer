import { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Importamos lo que ya tienen hecho
import { Dungeon } from './src/game/Dungeon';

export default function App() {
  // Estados de React para redibujar la pantalla
  const [mazmorra] = useState(new Dungeon());
  const [salaActual, setSalaActual] = useState(mazmorra.obtenerSala("inicio"));
  
  // Adaptamos el jugador de tu compañera (usa require para la imagen)
  const [jugador, setJugador] = useState({
    x: 100,
    y: 200,
    sprite: require('./assets/sprites/player.png') // Asegúrate que el archivo existe
  });

  const mover = (dir) => {
    let { x, y } = jugador;
    const velocidad = 20;
    if (dir === 'up') y -= velocidad;
    if (dir === 'down') y += velocidad;
    if (dir === 'left') x -= velocidad;
    if (dir === 'right') x += velocidad;
    setJugador({ ...jugador, x, y });
  };

  return (
    <View style={styles.container}>
      {/* 1. Fondo de la sala (Usamos ImageBackground de RN) */}
      <ImageBackground source={salaActual.imagen} style={styles.background}>
        
        {/* 2. El Jugador (Sprite) */}
        <Image 
          source={jugador.sprite} 
          style={[styles.sprite, { top: jugador.y, left: jugador.x }]} 
        />

        {/* 3. Interfaz de usuario (HUD) */}
        <View style={styles.hud}>
          <Text style={styles.texto}>Sala: {salaActual.nombre}</Text>
        </View>

        {/* 4. Controles (Joystick) */}
        <View style={styles.controles}>
          <TouchableOpacity onPress={() => mover('up')} style={styles.boton}><Text>▲</Text></TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => mover('left')} style={styles.boton}><Text>◀</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => mover('right')} style={styles.boton}><Text>▶</Text></TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => mover('down')} style={styles.boton}><Text>▼</Text></TouchableOpacity>
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, width: '100%', height: '100%' },
  sprite: { width: 50, height: 50, position: 'absolute' },
  hud: { marginTop: 40, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  texto: { color: 'white', fontSize: 18 },
  controles: { position: 'absolute', bottom: 30, alignSelf: 'center', alignItems: 'center' },
  boton: { backgroundColor: '#fff', padding: 20, margin: 5, borderRadius: 10 }
});