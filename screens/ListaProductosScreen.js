import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function ListaProductosScreen() {
  const [productos, setProductos] = useState([
    { id: '1', nombre: 'Producto 1', precio: 10 },
    { id: '2', nombre: 'Producto 2', precio: 20 },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text>Precio: ${item.precio}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  item: { padding: 20, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontSize: 18, fontWeight: 'bold' },
});
