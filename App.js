import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen.js';
import MenuScreen from './screens/MenuScreen.js';
import AgregarProductoScreen from './screens/AgregarProductoScreen.js';
import ListaProductosScreen from './screens/ListaProductosScreen.js';
import BalanceGeneralScreen from './screens/BalanceGeneralScreen.js';
import VentasScreen from './screens/VentasScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si hay una sesión activa
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="AgregarProducto" component={AgregarProductoScreen} />
            <Stack.Screen name="ListaProductos" component={ListaProductosScreen} />
            <Stack.Screen name="Ventas" component={VentasScreen} />
            <Stack.Screen name="BalanceGeneral" component={BalanceGeneralScreen} />
          </>
        ) : (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
