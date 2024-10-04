import React from 'react';
import { View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const BalanceGeneral = () => {
  const data = [
    {
      name: 'Ingresos',
      population: 5000,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Egresos',
      population: 2000,
      color: '#FF6347',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View>
      <PieChart
        data={data}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

export default BalanceGeneral;
