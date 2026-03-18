import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Sprites } from '../constants/sprites';
import { Player } from '../src/entities/Player';
import { Dungeon } from '../src/game/Dungeon';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [cargado, setCargado] = useState(false);
  const [mazmorra] = useState(new Dungeon());
  const [jugador] = useState(new Player(width / 2 - 32, height / 2 - 32, Sprites.player.idle));
  
  const [salaActual, setSalaActual] = useState(null);
  const [pos, setPos] = useState({ x: width / 2 - 32, y: height / 2 - 32 });

  useEffect(() => {
    const inicial = mazmorra.obtenerSala("inicio");
    if (inicial) {
      setSalaActual(inicial);
      setCargado(true);
    }
  }, []);

  const manejarAccion = (dir) => {
    const nPos = jugador.mover(dir, width, height);
    setPos({ x: nPos.x, y: nPos.y });

    // Lógica de cambio de sala (Bordes)
    let destino = null;
    const m = 40;
    if (nPos.y < m) destino = salaActual.conexiones[0];
    if (nPos.y > height - 160) destino = salaActual.conexiones[1];

    if (destino) {
      const nueva = mazmorra.obtenerSala(destino);
      if (nueva) {
        setSalaActual(nueva);
        const ry = nPos.y < m ? height - 180 : 60;
        jugador.y = ry;
        setPos({ x: nPos.x, y: ry });
      }
    }
  };

  if (!cargado) return <View style={styles.container}><Text style={{color:'white'}}>Cargando...</Text></View>;

  return (
    <View style={styles.container}>
      {/* Fondo con color de rescate (Gris oscuro) */}
      <ImageBackground 
        source={salaActual.imagen} 
        style={[styles.mapa, { backgroundColor: '#1a1a1a' }]} 
        resizeMode="cover"
      >
        {/* HUD */}
        <View style={styles.hud}>
          <Text style={styles.textoHud}>🏰 {salaActual.nombre}</Text>
          <Text style={styles.textoHud}>📍 X: {Math.round(pos.x)} Y: {Math.round(pos.y)}</Text>
        </View>

        {/* NOTA */}
        {salaActual.nota && (
          <View style={styles.cajaNota}>
            <Text style={styles.textoNota}>📜 {salaActual.nota}</Text>
          </View>
        )}

        {/* JUGADOR: Contenedor con color de rescate (Rojo) */}
        <View style={[styles.playerBox, { left: pos.x, top: pos.y }]}>
          <Image 
            source={Sprites.player.idle} 
            style={styles.sprite} 
          />
          {/* Si no ves la imagen, verás este cuadro rojo pequeño */}
          <View style={{width: 10, height: 10, backgroundColor: 'red', position: 'absolute'}} />
        </View>

        {/* CONTROLES */}
        <View style={styles.controles}>
          <TouchableOpacity onPress={() => manejarAccion('up')} style={styles.boton}><Text style={styles.flecha}>▲</Text></TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => manejarAccion('left')} style={styles.boton}><Text style={styles.flecha}>◀</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => manejarAccion('right')} style={styles.boton}><Text style={styles.flecha}>▶</Text></TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => manejarAccion('down')} style={styles.boton}><Text style={styles.flecha}>▼</Text></TouchableOpacity>
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  mapa: { flex: 1, width: width, height: height },
  playerBox: { position: 'absolute', width: 64, height: 64, zIndex: 50, backgroundColor: 'rgba(255,0,0,0.1)' },
  sprite: { width: '100%', height: '100%', resizeMode: 'contain' },
  hud: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(0,0,0,0.8)', padding: 10, zIndex: 100, borderLeftWidth: 3, borderLeftColor: 'gold' },
  textoHud: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  cajaNota: { position: 'absolute', top: 120, left: 20, right: 20, backgroundColor: '#fdf5e6', padding: 15, zIndex: 90, borderWidth: 1, borderColor: '#8b4513' },
  textoNota: { color: '#3e2723', fontStyle: 'italic', textAlign: 'center', fontSize: 13 },
  controles: { position: 'absolute', bottom: 50, alignSelf: 'center', alignItems: 'center', zIndex: 110 },
  boton: { backgroundColor: 'white', width: 60, height: 60, justifyContent: 'center', alignItems: 'center', margin: 5, borderRadius: 30, elevation: 5 },
  flecha: { fontSize: 24, fontWeight: 'bold' }
});