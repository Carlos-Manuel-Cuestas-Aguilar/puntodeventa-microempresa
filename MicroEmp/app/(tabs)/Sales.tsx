// src/screens/VerVentas.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ventas = [
  { id: '1', producto: 'Producto 1', monto: 100 },
  { id: '2', producto: 'Producto 2', monto: 150 },
  // Agrega más ventas aquí
];

const VerVentas = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ventas Realizadas</Text>
      <FlatList
        data={ventas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Producto: {item.producto}</Text>
            <Text>Monto: ${item.monto}</Text>
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

export default VerVentas;
