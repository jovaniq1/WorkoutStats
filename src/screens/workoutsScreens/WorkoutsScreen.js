import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import Svg, { Path } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  Text,
  Alert,
  HStack,
  Center,
  Stack,
  View,
  useToast,
  VStack,
  KeyboardAvoidingView,
  Spacer,
  Box,
  Icon,
  Heading,
  Pressable,
} from 'native-base';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { DataContext } from '../../context/dataContext';
import IsLoading from '../../components/isLoading/IsLoading';
import { useForm, Controller } from 'react-hook-form';
import { AddActionSheet } from '../../components/workout/Selectors';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import WavyComponent from '../../components/workout/WavyComponent';
function WorkoutsScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      workout: '',
    },
  });
  const {
    fetchExercise,
    exercises,
    data,
    createExercise,
    isOpenAddWorkout,
    apiErrors,
    onCloseAddWorkout,
  } = dataCtx;
  const { token } = authCtx;
  const toast = useToast();

  const getExercises = async () => {
    setIsLoading(true);
    await fetchExercise(token, route.params.id);
    setIsLoading(false);
  };
  const handleCreateNewWorkout = async (data) => {
    // console.log('data', data);
    setIsLoading(true);
    const response = await createExercise(token, data.workout, route.params.id);
    await fetchExercise(token, route.params.id);
    setIsLoading(false);

    {
      toast.show({
        placement: 'top',
        render: () => {
          return (
            <Alert
              w="100%"
              variant="solid"
              status={response[0]?.status === 500 ? 'error' : 'success'}
            >
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {response[0]?.success
                    ? response[0]?.success
                    : response[0]?.message}
                </Text>
              </HStack>
            </Alert>
          );
        },
      });
    }
  };
  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" justifyContent="flex-end">
      <Pressable
        w="76"
        alignSelf="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Animatable.Text
            animation="bounce"
            easing="ease-in"
            iterationCount="infinite"
            style={{ textAlign: 'center', paddingTop: 12 }}
          >
            <Icon
              as={<MaterialIcons name="delete" />}
              color="error.700"
              size="lg"
            />
          </Animatable.Text>
          {/* <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text> */}
        </VStack>
      </Pressable>
    </HStack>
  );

  const renderItem = ({ item }) => (
    <Pressable
      BottomWidth="1"
      bg="tertiary.700"
      borderColor="tertiary.900"
      borderBottomWidth="1"
      px={0}
      py={4}
      pl="4"
      pr="5"
      _pressed={{
        bg: 'tertiary.700:alpha.20',
      }}
      onPress={() => {
        navigation.push('WorkoutDetails', item);
      }}
    >
      <HStack justifyContent="space-between">
        <VStack>
          <Text
            color="coolGray.100"
            _dark={{
              color: 'coolGray.100',
            }}
            bold
          >
            {item?.name}
          </Text>
        </VStack>
        <Spacer />
        <Spacer />
        <Spacer />
        <Text
          fontSize="xs"
          color="coolGray.100"
          _dark={{
            color: 'coolGray.100',
          }}
          alignSelf="flex-start"
        >
          Last: {new Date(item?.createdAt)?.toString().slice(0, 16)}
        </Text>
      </HStack>
    </Pressable>
  );
  let labels = [];
  let hash = {};
  for (let i = 0; i < data.length; i++) {
    let workout = data[i]?.exercise?.name;

    if (hash[workout]) {
      hash[workout] = hash[workout] + 1;
      console.log('hash[workout]', hash[workout]);
    } else {
      hash[workout] = 1;
    }
  }
  let dataSets = [];
  for (let i = 0; i < exercises.length; i++) {
    let workout = exercises[i]?.name;
    if (hash[workout]) {
      labels.push(workout);
      dataSets.push(hash[workout]);
    } else {
      labels.push(workout);
      dataSets.push(0);
    }
  }

  useEffect(() => {
    getExercises();
  }, []);

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.5, y: 0.3 }}
        // Background Linear Gradient
        colors={['#000000', '#089f7f']}
        style={styles.image}
      >
        {isLoading ? (
          <IsLoading />
        ) : (
          <Center mb={56} mt={56}>
            {dataSets.length < 1 && (
              <Heading
                size="md"
                textAlign="center"
                fontWeight="700"
                alignText="center"
                color="coolGray.100"
                _dark={{
                  color: 'coolGray.100',
                }}
              >
                Add New Workout
              </Heading>
            )}
            {dataSets.length >= 2 && (
              <LineChart
                data={{
                  labels: [...labels],
                  datasets: [
                    {
                      data: [...dataSets],
                    },
                  ],
                }}
                withHorizontalLabels={false}
                width={Dimensions.get('window').width} // from react-native
                height={Dimensions.get('window').height * 0.3}
                yAxisLabel=""
                yAxisSuffix=" Times"
                verticalLabelRotation={30}
                horizontalLabelRotation={320}
                yAxisInterval={2} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
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
            )}

            <AddActionSheet
              apiErrors={apiErrors}
              isOpen={isOpenAddWorkout}
              onClose={onCloseAddWorkout}
              type="Workout"
              handleAdd={handleCreateNewWorkout}
              control={control}
              handleSubmit={handleSubmit}
              errors={errors}
            />

            <Box
              rounded="md"
              h={`${Dimensions.get('window').height * 0.3}px`}
              mt={16}
              w="full"
            >
              <WavyComponent />
              <Box
                bg="tertiary.700"
                flexDirection="row"
                justifyContent="space-around"
                borderColor="tertiary.900"
                borderBottomWidth="1"
                pb={2}
              >
                <Heading
                  color="coolGray.100"
                  bg="tertiary.700"
                  w="full"
                  py={4}
                  pl={4}
                  alignSelf="center"
                  borderColor="tertiary.900"
                  borderBottomWidth="2"
                  pb={2}
                >
                  Workouts
                </Heading>
              </Box>

              <SwipeListView
                data={exercises}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-75}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
              />
            </Box>
          </Center>
        )}
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
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    // change the color property for better output
    color: '#fff',
    textAlign: 'center',
    marginTop: 35,
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
export default WorkoutsScreen;
