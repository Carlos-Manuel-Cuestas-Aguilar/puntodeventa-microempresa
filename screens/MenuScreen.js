import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MenuScreen({ navigation, setIsLoggedIn }) {

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsLoggedIn(false);  
      navigation.navigate('Login');  
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú Principal</Text>
      <Button title="Agregar Producto" onPress={() => navigation.navigate('AgregarProducto')} />
      <Button title="Lista de Productos" onPress={() => navigation.navigate('ListaProductos')} />
      <Button title="Balance General" onPress={() => navigation.navigate('BalanceGeneral')} />
      <Button title="Ventas" onPress={() => navigation.navigate('Ventas')} />

      {/* Botón de Logout */}
      <Button title="Cerrar Sesión" onPress={handleLogout} color="#f44336" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f0f8ff' // Fondo azul claro
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    color: '#4682b4' // Texto azul oscuro
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#4682b4', // Botones azules
    color: '#fff', // Texto blanco
    padding: 10,
    borderRadius: 5,
  }
});
