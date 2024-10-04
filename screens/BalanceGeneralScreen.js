import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BalanceGeneralScreen() {
  const [productos, setProductos] = useState([
    { id: '1', nombre: 'Producto 1', precio: 10 },
    { id: '2', nombre: 'Producto 2', precio: 20 },
  ]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calcularBalance = () => {
      const suma = productos.reduce((acc, producto) => acc + producto.precio, 0);
      setTotal(suma);
    };

    calcularBalance();
  }, [productos]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Balance General</Text>
      <Text>Total Inventario: ${total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
