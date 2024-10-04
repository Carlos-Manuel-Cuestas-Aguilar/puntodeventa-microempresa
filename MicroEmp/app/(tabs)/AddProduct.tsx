// src/screens/AgregarProducto.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AgregarProducto = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  const handleAgregarProducto = () => {
    // Lógica para agregar el producto
    console.log(`Producto: ${nombre}, Precio: ${precio}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Producto"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />
      <Button title="Agregar Producto" onPress={handleAgregarProducto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 20, padding: 10 },
});

export default AgregarProducto;
