import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, ImageBackground, Dimensions } from 'react-native';
import {
  IconButton,
  ScrollView,
  Center,
  Spacer,
  Text,
  View,
  Heading,
  Actionsheet,
  Button,
  Stagger,
  useDisclose,
  KeyboardAvoidingView,
  HStack,
  Box,
  FlatList,
  VStack,
  Input,
  useColorMode,
  useColorModeValue,
  Stack,
} from 'native-base';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
function StatsScreen() {
  const data2 = {
    labels: ['legs', 'arms', 'back', 'Delts', 'test'], // optional
    data: [0.9, 0.2, 0.5, 0.5, 0.9],
  };
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const data1 = {
    labels: ['Test1', 'Test2'],
    legend: ['L1', 'L2', 'L3'],
    data: [
      [60, 60, 60],
      [30, 30, 60],
    ],
    barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
  };
  const data3 = [
    {
      name: 'Seoul',
      population: 21500000,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Toronto',
      population: 2800000,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Beijing',
      population: 527612,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'New York',
      population: 8538000,
      color: '#ffffff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Moscow',
      population: 11920000,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.9,
    decimalPlaces: 1,
    useShadowColorFromDataset: false, // optional
  };
  let screenWidth = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.1, y: 0.1 }}
        // Background Linear Gradient
        colors={['#000000', '#089f7f']}
        style={styles.image}
      >
        <ScrollView>
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
            <Text>Bezier Line Chart</Text>
          </Heading>

          <VStack space={12}>
            <LineChart
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                ],
                datasets: [
                  {
                    data: [1, 1, 1, 1, 1, 4],
                  },
                ],
              }}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />
            <ProgressChart
              data={data2}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
            />
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
              <Text>Line Chart</Text>
            </Heading>
            <LineChart
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                ],
                datasets: [
                  {
                    data: [1, 1, 1, 1, 1, 4],
                  },
                ],
              }}
              width={Dimensions.get('window').width} // from react-native
              height={220}
              yAxisLabel=""
              yAxisSuffix="lb"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
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
              <Text>BarChart</Text>
            </Heading>
            <BarChart
              data={data}
              width={screenWidth}
              height={220}
              yAxisLabel="$"
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
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
              <Text>StackedBarChart</Text>
            </Heading>
            <StackedBarChart
              data={data1}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />
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
              <Text>PieChart</Text>
            </Heading>

            <PieChart
              data={data3}
              width={screenWidth}
              height={190}
              chartConfig={chartConfig}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              absolute
            />
          </VStack>

          <Spacer pt={'24'} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
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
  imageCover: {
    opacity: 0.66,
  },
});
export default StatsScreen;
