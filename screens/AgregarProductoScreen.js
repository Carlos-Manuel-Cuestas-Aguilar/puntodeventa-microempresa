import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AgregarProductoScreen() {
  const [nombreProducto, setNombreProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');

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
      <Button title="Agregar" onPress={handleAgregarProducto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 },
});
