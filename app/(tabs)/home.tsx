// app/(tabs)/home.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();

  const navigateTo = (screenName) => {
    router.push(`/${screenName}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú Principal</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigateTo('productos')}>
        <Text style={styles.buttonText}>Ir a Productos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigateTo('proveedores')}>
        <Text style={styles.buttonText}>Ir a Proveedores</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff', // Color de fondo claro
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333', // Color del texto principal
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4B9CD3', // Color principal del botón
    padding: 15,
    borderRadius: 8,
    width: '80%', // Ancho del botón
    alignItems: 'center',
    marginVertical: 10, // Espaciado vertical entre botones
  },
  buttonText: {
    color: '#ffffff', // Color del texto del botón
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Home;
