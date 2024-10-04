import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ventas = [
  { id: '1', producto: 'Producto A', cantidad: 2, total: 50 },
  { id: '2', producto: 'Producto B', cantidad: 1, total: 30 },
  // Agrega más ventas aquí
];

const VentasRealizadas = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={ventas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Producto: {item.producto}</Text>
            <Text>Cantidad: {item.cantidad}</Text>
            <Text>Total: ${item.total}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
});

export default VentasRealizadas;
