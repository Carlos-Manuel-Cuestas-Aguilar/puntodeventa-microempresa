import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import { apiAxios, route } from '../../apiAxios_route';

export default function HomeScreen() {
  const [errorMessage, setErrorMessage] = useState({}); // Estado para los mensajes de error

  return (
    <View style={styles.container}>
      {/* Logo o imagen de cabecera */}
      <Image
        source={require('../../assets/images/favicon.png')} // Agrega tu propio logo aquí
        style={styles.logo}
      />

      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

      {/* Formulario de inicio de sesión */}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await apiAxios.post(route('login'), values);
            apiAxios.refreshToken(response.data.token);
            resetForm();
            setErrorMessage({}); // Limpiar los errores si la autenticación es exitosa
          } catch (error) {
            // Capturar los errores de validación de Laravel
            if (error.response && error.response.data.errors) {
              setErrorMessage(error.response.data.errors); // Guardamos los errores
            } else {
              setErrorMessage({ general: 'Error al conectar con el servidor.' });
            }
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.form}>
            <Text style={styles.label}>Correo</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Ingresa tu correo"
              placeholderTextColor="#a9a9a9"
            />
            {errorMessage.email && <Text style={styles.errorText}>{errorMessage.email[0]}</Text>}

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="#a9a9a9"
            />
            {errorMessage.password && <Text style={styles.errorText}>{errorMessage.password[0]}</Text>}

            {errorMessage.general && <Text style={styles.errorText}>{errorMessage.general}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              ¿Olvidaste tu contraseña? <Text style={styles.link}>Recupérala aquí</Text>
            </Text>
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
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#f0f8ff' // Azul claro
  },
  logo: {
    width: 100, 
    height: 100, 
    marginBottom: 30
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#4682b4', 
    marginBottom: 5, 
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16, 
    color: '#6c757d', 
    marginBottom: 20, 
    textAlign: 'center'
  },
  form: { 
    width: '100%', 
    maxWidth: 400 
  },
  label: {
    fontSize: 16, 
    color: '#4682b4', 
    marginBottom: 5 
  },
  input: { 
    height: 45, 
    borderColor: '#b0c4de', 
    borderWidth: 1, 
    borderRadius: 8, 
    paddingLeft: 15, 
    marginBottom: 15, 
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#4682b4', 
    paddingVertical: 12, 
    borderRadius: 8, 
    marginBottom: 15
  },
  buttonText: {
    color: '#fff', 
    textAlign: 'center', 
    fontSize: 18
  },
  footerText: {
    fontSize: 14, 
    color: '#6c757d', 
    textAlign: 'center'
  },
  link: {
    color: '#4682b4', 
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red', 
    marginBottom: 10, 
    textAlign: 'center'
  }
});
