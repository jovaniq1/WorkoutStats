import React from 'react';
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
} from 'native-base';
import { StatusBar } from 'expo-status-bar';
import NativeBaseIcon from './src/NativeBaseIcon';
import { Platform } from 'react-native';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './src/navigation/Main';
import AuthContextProvider from './src/context/authContext';
import DataContextProvider from './src/context/dataContext';

// import WorkoutDetailsScreen from './src/screens/WorkoutDetails';
// import SignUpScreen from './src/screens/SignUp';
// import LoginScreen from './src/screens/Login';
// import StatsScreen from './src/screens/Stats';

// Define the config
const config = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  return (
    <DataContextProvider>
      <AuthContextProvider>
        <NativeBaseProvider theme={theme}>
          <StatusBar style="light" />
          <Main />
        </NativeBaseProvider>
      </AuthContextProvider>
    </DataContextProvider>
  );
}
