import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AnimatedLoader from 'react-native-animated-loader';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import {
  IconButton,
  SectionList,
  Center,
  Heading,
  Text,
  View,
  Badge,
  Button,
  Flex,
  useDisclose,
  useColorModeValue,
  HStack,
  Box,
  VStack,
  Pressable,
  useColorMode,
  Stack,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { DataContext } from '../../context/dataContext';

function IsLoading() {
  // const [visible, setVisible] = useState(true);
  // const dataCtx = useContext(DataContext);
  // const { IsLoading, setIsLoading } = dataCtx;
  // useEffect(() => {
  //   const timer = setTimeout(() => setVisible(!visible), 5000);
  //   return () => clearTimeout(timer);
  // }, []);
  return (
    <Center>
      <AnimatedLoader
        visible={true}
        source={require('./weight.json')}
        animationStyle={styles.lottie}
        speed={1}
      >
        <Animatable.Text
          animation="pulse"
          easing="ease-in"
          iterationCount="infinite"
          style={{ textAlign: 'center', paddingTop: 12 }}
        >
          <Badge // bg="red.400"
            bg="tertiary.900"
            rounded="full"
            variant="solid"
            py={2}
            px={5}
            _text={{
              fontSize: 12,
            }}
          >
            <Heading size="lg" color="tertiary.600">
              Loading
            </Heading>
          </Badge>
        </Animatable.Text>
      </AnimatedLoader>
    </Center>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
export default IsLoading;
