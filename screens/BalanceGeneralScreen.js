import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const data = [
  {
    name: 'Ingresos',
    population: 800,
    color: '#4caf50',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Egresos',
    population: 300,
    color: '#f44336',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const BalanceGeneralScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Balance General</Text>
      <PieChart
        data={data}
        width={Dimensions.get('window').width - 50}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f8ff' // Fondo azul claro
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#4682b4', // Texto azul oscuro
  },
  chartConfig: {
    backgroundGradientFrom: '#e0f7fa', // Gradiente azul claro
    backgroundGradientTo: '#b2ebf2',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  }
});


export default BalanceGeneralScreen;
