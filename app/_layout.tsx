import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useNavigation } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { apiAxios } from '@/apiAxios_route';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [token, setToken] = useState('JAJANOHAYTOKEN');
  const [loaded, setLoaded] = useState(false);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [fonts] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded && fonts) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 2000);
    }
  }, [fonts, loaded]);

  useEffect(() => {
    const checkToken = async () => {
      const isValidToken = await apiAxios.isValidToken();
      if (isValidToken && navigation.getCurrentRoute().name == 'index') {
        navigation.navigate('home');
      } else if(!isValidToken) {
        navigation.navigate('index');
      }
      console.log("Es valida la token:", isValidToken);
    }

    if (token != 'JAJANOHAYTOKEN')
      checkToken();
  }, [token]);


  useEffect(() => {
    const boot = async () => {
      await apiAxios.boot(setToken);
      setLoaded(true);
    };
    boot();
  }, []);

  if(token == 'JAJANOHAYTOKEN') {
    return;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
