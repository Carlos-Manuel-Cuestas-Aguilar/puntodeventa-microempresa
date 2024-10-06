import React, {useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import axiosRoute from '../axiosRoute';
import axios from 'axios';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const isValid = await axiosRoute.isValidToken();  // Verificar si el token es válido
          setIsLoggedIn(isValid);
        }
      } catch (error) {
        console.error("Error al verificar el token", error);
      }
    };
    checkLoginStatus();
  }, []);
  
  return (
    <View style={styles.container}><Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={async (values) => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', values);  // Llamar directamente a la ruta
        await axiosRoute.refreshToken(response.data.token);
        setIsLoggedIn(true);
        navigation.navigate('MenuScreen');
      } catch (error) {
        console.error("Error al iniciar sesión", error);
      }
    }}
    
    
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <View style={styles.form}>
        <Text>Correo</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          placeholder="Ingresa tu correo"
        />
        <Text>Contraseña</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          secureTextEntry
          placeholder="Ingresa tu contraseña"
        />
        <Button onPress={handleSubmit} title="Iniciar Sesión" />
      </View>
    )}
  </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: '#f0f8ff' // Azul claro
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: 'center', 
    color: '#4682b4' // Azul más oscuro
  },
  input: { 
    height: 40, 
    borderColor: '#4682b4', // Borde azul
    borderWidth: 1, 
    marginBottom: 10, 
    paddingLeft: 10,
    backgroundColor: '#fff', // Fondo blanco
    color: '#000' // Texto en negro
  },
  button: {
    backgroundColor: '#4682b4', // Botón azul
    color: '#fff', // Texto blanco
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 10
  }
});
