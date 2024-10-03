import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, Button, View, ScrollView } from 'react-native';
import { Formik } from 'formik';
import axiosRoute from '../../axiosRoute'; // Asegúrate de tener axiosRoute configurado
import ParallaxScrollView from '@/components/ParallaxScrollView'; // Asegúrate de tener este componente o sustituirlo
import { HelloWave } from '@/components/HelloWave'; // Componente personalizado
import { ThemedText } from '@/components/ThemedText'; // Componente personalizado
import { ThemedView } from '@/components/ThemedView'; // Componente personalizado

export default function HomeScreen() {
  const [proveedores, setProveedores] = useState([]);

  // Función para obtener proveedores
  function getProveedores() {
    axiosRoute.get('proveedores.index').then(response => {
      setProveedores(response.data);
    });
  }

  // Función para cerrar sesión
  function logout() {
    axiosRoute.post('logout').then(() => {
      axiosRoute.refreshToken();
    });
  }

  useEffect(() => {
    const checkToken = async () => {
      console.log("Es valida la token:", await axiosRoute.isValidToken());
    }

    checkToken();
  }, []);

  return (
    <View style={{ flex: 1 }}>
        <Button
        title="Volver a Home"
        onPress={() => navigation.navigate('menu')} // Vuelve a la pantalla anterior
      />
      {/* Formulario de inicio de sesión */}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          axiosRoute.post('login', null, values).then(response => {
            axiosRoute.refreshToken(response.data.token);
          });
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

      {/* Botón para obtener proveedores */}
      <Button onPress={getProveedores} title="Obtener proveedores" />

      {/* Mostrar proveedores */}
      <ScrollView style={styles.proveedoresList}>
        {proveedores.map(proveedor => (
          <Text key={proveedor.id}>{proveedor.nombre}</Text>
        ))}
      </ScrollView>

      {/* Botón para cerrar sesión */}
      <Button onPress={logout} title='Cerrar Sesión' />


    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  proveedoresList: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
