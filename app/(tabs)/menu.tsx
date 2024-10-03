import { Image, StyleSheet, Button,} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>

        <Button title="Volver a Home" onPress={() => navigation.navigate('(tabs)')}/>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({

});
