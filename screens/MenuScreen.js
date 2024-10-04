import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú Principal</Text>
      <Button title="Agregar Producto" onPress={() => navigation.navigate('AgregarProducto')} />
      <Button title="Lista de Productos" onPress={() => navigation.navigate('ListaProductos')} />
      <Button title="Balance General" onPress={() => navigation.navigate('BalanceGeneral')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
