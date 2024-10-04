import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Menu from './Menu';
import AddProduct from './AddProduct';
import ListProducts from './ListProducts';
import BalanceGeneral from './BalanceGeneral';
import Sales from './Sales';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Agregar Producto" component={AddProduct} />
        <Stack.Screen name="Lista de Productos" component={ListProducts} />
        <Stack.Screen name="Balance General" component={BalanceGeneral} />
        <Stack.Screen name="Ventas" component={Sales} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
