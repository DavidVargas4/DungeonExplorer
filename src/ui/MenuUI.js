import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Sprites } from '../../constants/sprites';

/**
 * MenuUI: para mostrar el Inventario y los Ajustes.
 */
export const MenuUI = ({ tipo, cerrar, items = [] }) => {
    const isInv = tipo === 'inventario';

    const sourceSheet = isInv ? Sprites.ui_inventory : Sprites.ui_settings;

    const windowW = 310; // Ancho visual del menú
    const windowH = 340; // Alto visual del menú
    
    // Desplazamiento horizontal para ocultar los otros cuadros de la hoja
    const offsetX = isInv ? -315 : -635; 

    return (
        <View style={styles.containerOverlay}>
            {/* Contenedor principal del Modal */}
            <View style={[styles.modal, { width: windowW, height: windowH }]}>
                
                {/* 1. CAPA DE FONDO: Imagen del pergamino recortada */}
                <View style={styles.cropWindow}>
                    <Image
                        source={sourceSheet}
                        style={{
                            width: 950, // Ancho total de la hoja (aprox 3 cuadros de 315px)
                            height: 600, 
                            marginLeft: offsetX,
                            marginTop: -5, 
                        }}
                        resizeMode="stretch"
                    />
                </View>

                {/* 2. CAPA DE CONTENIDO: Texto y Grilla de Items */}
                <View style={styles.contenidoSuperior}>
                    <Text style={styles.tituloMenu}>
                        {isInv ? "INVENTARIO" : "AJUSTES"}
                    </Text>
                    
                    {isInv ? (
                        <View style={styles.grid}>
                            {items.length > 0 ? items.map((item, index) => (
                                <View key={index} style={styles.slot}>
                                    {/* Muestra el nombre recortado del item en el slot */}
                                    <Text style={styles.itemTexto}>{item.substring(0, 7)}</Text>
                                </View>
                            )) : (
                                <Text style={styles.vacio}>Mochila vacía...</Text>
                            )}
                        </View>
                    ) : (
                        <View style={styles.settingsBox}>
                            <Text style={styles.settingsText}>VOLUMEN: 100%</Text>
                            <Text style={styles.settingsText}>MÚSICA: ON</Text>
                            <Text style={styles.settingsText}>IDIOMA: ESPAÑOL</Text>
                        </View>
                    )}
                </View>

                {/* 3. BOTÓN CERRAR: Ubicado sobre la 'X' del dibujo original */}
                <TouchableOpacity onPress={cerrar} style={styles.hitboxCerrar}>
                    <Text style={styles.xVisible}>✕</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerOverlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)', // Fondo oscuro semitransparente
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5000, // Siempre por encima de todo
    },
    modal: {
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 15,
    },
    cropWindow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    contenidoSuperior: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
    },
    tituloMenu: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e7d32', 
        marginBottom: 20,
        fontFamily: 'serif',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '90%',
    },
    slot: {
        width: 45,
        height: 45,
        margin: 4,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemTexto: {
        fontSize: 8,
        color: '#3e2723',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    vacio: {
        color: '#8b4513',
        marginTop: 50,
        fontStyle: 'italic',
    },
    settingsBox: {
        marginTop: 20,
        alignItems: 'flex-start',
    },
    settingsText: {
        color: '#3e2723',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'serif'
    },
    hitboxCerrar: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    xVisible: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8b0000', 
    }
});