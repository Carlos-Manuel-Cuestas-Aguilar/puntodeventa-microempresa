import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Menu: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

const Login = ({ navigation }: Props) => {
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      // Validación ficticia
      if (values.username === 'admin' && values.password === '1234') {
        await AsyncStorage.setItem('loggedIn', 'true');
        navigation.navigate('Menu');
      } else {
        alert('Invalid credentials');
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.errors.username && <Text>{formik.errors.username}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.errors.password && <Text>{formik.errors.password}</Text>}
      <Button title="Login" onPress={formik.handleSubmit as any} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 4,
  },
});

export default Login;
