import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import {
  Link,
  HStack,
  Center,
  Heading,
  Button,
  VStack,
  AspectRatio,
  Text,
  Box,
  Image,
  StatusBar,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
const image = {
  uri: '../assets/cover.jpg',
};
function CoverScreen({ navigation }) {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Workouts'], // optional
  };
  let screenWidth = Dimensions.get('window').width;
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.1, y: 0.5 }}
        // Background Linear Gradient
        colors={['#000000', '#089f7f']}
        style={styles.image}
      >
        <Box safeArea p="2" py="8" w="100%" justifyContent="space-between">
          <Center>
            <Heading
              size="3xl"
              textAlign="center"
              fontWeight="700"
              alignText="center"
              color="coolGray.100"
              _dark={{
                color: 'coolGray.100',
              }}
            >
              Welcome
            </Heading>
            <LineChart
              data={data}
              width={screenWidth}
              height={256}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
            />
            <Button
              mt="4/5"
              size="lg"
              w="4/6"
              p="3"
              _dark={{ colorScheme: 'blueGray' }}
              bg="trueGray.400:alpha.70"
              onPress={() => {
                navigation.push('Login');
              }}
            >
              <Heading size="sm">Sign in</Heading>
            </Button>
            <Button
              mt="4"
              w="4/6"
              p="3"
              _dark={{ colorScheme: 'blueGray' }}
              colorScheme="blueGray"
              bg="trueGray.400:alpha.70"
              onPress={() => {
                navigation.push('Signup');
              }}
            >
              <Heading size="sm"> Create Account</Heading>
            </Button>
          </Center>
        </Box>
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
export default CoverScreen;
