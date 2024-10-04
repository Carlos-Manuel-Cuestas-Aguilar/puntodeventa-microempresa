import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  AddProduct: undefined;
  ListProducts: undefined;
  BalanceGeneral: undefined;
  Sales: undefined;
};

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddProduct'>;

type Props = {
  navigation: MenuScreenNavigationProp;
};

const Menu = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Button title="Agregar Producto" onPress={() => navigation.navigate('AddProduct')} />
      <Button title="Lista de Productos" onPress={() => navigation.navigate('ListProducts')} />
      <Button title="Balance General" onPress={() => navigation.navigate('BalanceGeneral')} />
      <Button title="Ver Ventas" onPress={() => navigation.navigate('Sales')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default Menu;
