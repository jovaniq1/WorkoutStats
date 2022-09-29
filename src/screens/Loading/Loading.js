import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
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
function LoadingScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.1, y: 0.5 }}
        // Background Linear Gradient
        colors={['#000000', '#089f7f']}
        style={styles.image}
      >
        <HStack space={8}>
          <Animatable.Text
            animation="fadeOut"
            easing="ease-out"
            iterationCount="infinite"
            style={{ textAlign: 'center' }}
          >
            <IconButton
              _pressed={{ bg: 'tertiary.500' }}
              variant="solid"
              bg="tertiary.900:alpha.20"
              rounded="full"
              size="lg"
              icon={<FontAwesome5 name="running" size={48} color="#059669" />}
            />
          </Animatable.Text>
          <Animatable.Text
            animation="fadeOutRight"
            easing="ease-out"
            iterationCount="infinite"
            style={{ textAlign: 'center' }}
          >
            <IconButton
              _pressed={{ bg: 'tertiary.500' }}
              variant="solid"
              bg="tertiary.900:alpha.20"
              rounded="full"
              size="lg"
              icon={<FontAwesome5 name="running" size={48} color="#059669" />}
            />
          </Animatable.Text>
          <Animatable.Text
            animation="fadeOutRight"
            easing="ease-out"
            iterationCount="infinite"
            style={{ textAlign: 'center' }}
          >
            <IconButton
              _pressed={{ bg: 'tertiary.500' }}
              variant="solid"
              bg="tertiary.900:alpha.20"
              rounded="full"
              size="lg"
              icon={<FontAwesome5 name="running" size={48} color="#059669" />}
            />
          </Animatable.Text>
          <Animatable.Text
            animation="fadeOutRight"
            easing="ease-out"
            iterationCount="infinite"
            style={{ textAlign: 'center' }}
          >
            <IconButton
              _pressed={{ bg: 'tertiary.500' }}
              variant="solid"
              bg="tertiary.900:alpha.20"
              rounded="full"
              size="lg"
              icon={<FontAwesome5 name="running" size={48} color="#059669" />}
            />
          </Animatable.Text>
        </HStack>
        <Center>
          <Animatable.Text
            animation="pulse"
            easing="ease-in"
            iterationCount="infinite"
            style={{ textAlign: 'center', padding: 20 }}
          >
            <IconButton
              _pressed={{ bg: 'tertiary.500' }}
              variant="solid"
              bg="tertiary.900:alpha.20"
              rounded="full"
              size="lg"
              icon={<Feather name="loader" size={48} color="#059669" />}
            />
          </Animatable.Text>
        </Center>
      </LinearGradient>
    </View>
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
});
export default LoadingScreen;
