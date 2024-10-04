// src/screens/ListaProductos.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const productos = [
  { id: '1', nombre: 'Producto 1', precio: 100 },
  { id: '2', nombre: 'Producto 2', precio: 150 },
  // Agrega más productos aquí
];

const ListaProductos = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Productos</Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Precio: ${item.precio}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default ListaProductos;
