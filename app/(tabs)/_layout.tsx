// app/(tabs)/_layout.js
import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors'; // Esto lo puedes ajustar si necesitas mantener esta estructura
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { apiAxios, route } from '@/apiAxios_route';

export default function Layout() {
  const colorScheme = useColorScheme();
  
  function logout() {
    apiAxios.post(route('logout')).then(() => {
      apiAxios.refreshToken(); // Maneja la lógica después del cierre de sesión
    });
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4B9CD3', // Color activo de las pestañas
        tabBarStyle: {
          backgroundColor: '#F7F9FC', // Color de fondo de la barra de pestañas
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: () => null,
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Esto oculta el botón
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>
                Cerrar Sesión
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="productos"
        options={{
          title: 'Productos',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'productos' : 'home-outline'} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>
                Cerrar Sesión
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="proveedores"
        options={{
          title: 'Proveedores',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'proveedores' : 'home-outline'} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>
                Cerrar Sesión
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}

// Estilos para el botón de cerrar sesión
const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 15,
    backgroundColor: '#FF6F61', // Color secundario para el botón de cerrar sesión
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff', // Color del texto blanco
    fontWeight: 'bold',
    fontSize: 16,
  },
});
