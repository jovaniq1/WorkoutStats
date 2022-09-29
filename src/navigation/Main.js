import React, { useContext, useEffect, useState } from 'react';
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
  CheckIcon,
  Button,
  Icon,
} from 'native-base';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Details from '../screens/tabScreens/Details';

import CategoriesScreens from '../screens/workoutsScreens/CategoriesScreens';
import WorkoutDetailsScreen from '../screens/workoutsScreens/WorkoutDetailsScreen.js';
import WorkoutsScreen from '../screens/workoutsScreens/WorkoutsScreen';

import SignUpScreen from '../screens/authScreens/SignUp';
import LoginScreen from '../screens/authScreens/Login';
import StatsScreen from '../screens/tabScreens/Stats';
import HomeScreen from '../screens/tabScreens/Home';
import CoverScreen from '../screens/Cover';
import { AuthContext } from '../context/authContext';
import { DataContext } from '../context/dataContext';
import { TouchableOpacity } from 'react-native-web';
import LoadingScreen from '../screens/Loading/Loading';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const { logout } = authCtx;
  const { settingsOnOpen } = dataCtx;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerStyle: {
          backgroundColor: 'black',
          borderBottomColor: 'red',
        },
        tabBarIconStyle: {
          paddingTop: 0,
          paddingBottom: 0,
        },
        tabBarLabelStyle: {
          paddingTop: 0,
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
        tabBarInactiveTintColor: '#ffff',
        tabBarStyle: {
          position: 'absolute',
          borderRadius: 100,

          height: 85,
          backgroundColor: '#e5e0f0',
          marginBottom: 18,

          shadowOpacity: 0.6,
          opacity: 0.5,
        },

        headerRight: ({ color, size, focused }) => (
          <Icon
            as={Ionicons}
            onPress={settingsOnOpen}
            size={6}
            color={focused ? '#10b981' : '#fff'}
            name="ios-settings-sharp"
          />
        ),
        headerLeft: ({ color, size, focused }) => (
          <MaterialCommunityIcons
            name="weight-lifter"
            size={24}
            color={focused ? '#10b981' : '#fff'}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#008000',
          tabBarInactiveTintColor: '#202124',

          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              as={Ionicons}
              name="ios-home"
              size={size}
              color={focused ? '#008000' : '#202124'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={WorkoutsInfo}
        options={{
          headerShown: false,
          tabBarLabel: 'Workout',
          tabBarActiveTintColor: '#008000',
          tabBarInactiveTintColor: '#202124',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="weight-lifter"
              size={size}
              color={focused ? '#008000' : '#202124'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarLabel: 'Stats',
          tabBarActiveTintColor: '#008000',
          tabBarInactiveTintColor: '#202124',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              as={Ionicons}
              name="ios-stats-chart-sharp"
              size={size}
              color={focused ? '#008000' : '#202124'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="cover" component={CoverScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Signup"
        component={SignUpScreen}
        options={{
          title: 'Create Account',
        }}
      />
    </Stack.Navigator>
  );
}
function WorkoutsInfo() {
  const dataCtx = useContext(DataContext);
  const { onOpen, onOpenAddCategory, onOpenAddWorkout } = dataCtx;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          position: 'absolute',
          backgroundColor: 'black',
          shadowOpacity: 0.6,
          opacity: 0.2,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Categories"
        component={CategoriesScreens}
        options={({ route }) => ({
          headerTitleAlign: 'center',
          headerRight: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="plus"
              size={24}
              onPress={onOpenAddCategory}
              color={focused ? '#10b981' : '#fff'}
            />
          ),

          headerTintColor: '#fff',
          headerTransparent: true,
        })}
      />
      <Stack.Screen
        name="Workouts"
        component={WorkoutsScreen}
        options={({ route }) => ({
          title: route?.params?.name,
          headerTitleAlign: 'center',
          headerRight: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="plus"
              size={24}
              onPress={onOpenAddWorkout}
              color={focused ? '#10b981' : '#fff'}
            />
          ),

          headerTintColor: '#fff',
          headerTransparent: true,
        })}
      />

      <Stack.Screen
        name="WorkoutDetails"
        options={({ route }) => ({
          title: route?.params?.name,
          headerTitleAlign: 'center',
          headerRight: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              onPress={onOpen}
              name="history"
              size={24}
              color={focused ? '#10b981' : '#fff'}
            />
          ),

          headerTintColor: '#fff',
          headerTransparent: true,
        })}
        component={WorkoutDetailsScreen}
      />
    </Stack.Navigator>
  );
}
function NewWorkout({ route: { params }, navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          position: 'absolute',
          backgroundColor: 'black',
          shadowOpacity: 0.6,
          opacity: 0.2,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Workout"
        options={{
          title: params.selectedWorkout.name,

          headerTitleAlign: 'center',
          headerRight: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              onPress={() => params.isWorkoutOnToggle()}
              name="weight-lifter"
              size={24}
              color={focused ? '#10b981' : '#fff'}
            />
          ),
          headerLeft: ({ color, size, focused }) => (
            <Icon
              onPress={() => navigation.navigate('Tabs')}
              as={Ionicons}
              name="ios-home"
              size={19}
              color={focused ? '#10b981' : '#fff'}
            />
          ),

          headerTintColor: '#fff',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
        initialParams={params}
        component={Details}
      />
    </Stack.Navigator>
  );
}
export default function Main() {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const [isAuth, setIsAuth] = useState(false);
  const { isLoading } = dataCtx;

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        //console.log('token', JSON.parse(value));
        setIsAuth(true);
      }
    } catch (err) {
      console.log('err', err);
    }
  };
  useEffect(() => {
    getData();
  }, [isAuth]);
  // console.log('isAUth', authCtx.isAuthenticated);
  // console.log('isAUth', isLoading);
  return (
    <NavigationContainer>
      {/* {isLoading && (
        <Stack.Navigator>
          <Stack.Screen
            name="loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )} */}

      {authCtx.isAuthenticated ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={MyTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
