import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AgregarProductoScreen() {
  const [nombreProducto, setNombreProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');
  const [proveedorProducto, setProveedorProducto] = useState('');

  const handleAgregarProducto = () => {
    // Aquí puedes manejar el almacenamiento de los productos
    alert('Producto agregado: ' + nombreProducto);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Producto"
        value={nombreProducto}
        onChangeText={setNombreProducto}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={precioProducto}
        onChangeText={setPrecioProducto}
      />
      <TextInput
        style={styles.input}
        placeholder="Proveedor del Producto"
        value={proveedorProducto}
        onChangeText={setProveedorProducto}
      />
      <Button title="Agregar" onPress={handleAgregarProducto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#f0f8ff' // Fondo azul claro
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: 'center', 
    color: '#4682b4' // Texto azul oscuro
  },
  input: { 
    height: 40, 
    borderColor: '#4682b4', // Borde azul
    borderWidth: 1, 
    marginBottom: 10, 
    paddingLeft: 10,
    backgroundColor: '#fff', // Fondo blanco
    color: '#000' // Texto negro
  },
  button: {
    backgroundColor: '#4682b4', // Botón azul oscuro
    color: '#fff', // Texto blanco
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 10
  }
});
