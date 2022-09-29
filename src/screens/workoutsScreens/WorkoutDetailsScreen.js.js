import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useRef } from 'react';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import WavyComponent from '../../components/workout/WavyComponent';

import {
  IconButton,
  Button,
  Center,
  Text,
  View,
  Badge,
  Icon,
  Flex,
  useDisclose,
  useColorModeValue,
  KeyboardAvoidingView,
  HStack,
  Box,
  VStack,
  Pressable,
  useColorMode,
  Stack,
  Modal,
  Heading,
  Container,
  Spacer,
  ScrollView,
  FlatList,
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { LineChart } from 'react-native-chart-kit';
import Carousel from 'react-native-snap-carousel';
import { WorkoutDetailsBox } from '../../components/workout/WorkoutDetailsBox';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { apiGraphql } from '../../api/fetchingAxios';
import IsLoading from '../../components/isLoading/IsLoading';
import { DataContext } from '../../context/dataContext';
import { RepsAndWeightSelector } from '../../components/workout/Selectors';
import { HistoryActionSheet } from '../../components/actionSheet/HistoryActionSheet';
function WorkoutDetailsScreen({ navigation, route }) {
  const [sets, setSets] = useState([]);
  const [showData, setShowData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [workoutData, setWorkoutData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [selectedReps, setSelectedReps] = useState(0);
  const [selectedWeights, setSelectedWeights] = useState(0);
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const {
    isOpen: isOpenSet,
    onOpen: onOpenSet,
    onClose: onCloseSet,
  } = useDisclose();
  const {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    fetchSets,
    fetchAllData,
    createSet,
    setIsLoading,
    isLoading,
  } = dataCtx;
  const { token } = authCtx;
  const data = route.params;
  const scrollViewRef = useRef();
  const fetchingData = async () => {
    setIsLoading(true);
    const response = await fetchSets(token, data.id);
    await fetchAllData(token);
    let newData = arrangeData(response);
    let graphNewData = arrangeDataGraph(newData);
    let temp = newData[newData.length - 1];
    let tempData = temp?.data?.sort(function (a, b) {
      return b.id - a.id;
    });

    if (
      new Date(temp?.title).toString().slice(0, 15) ===
      new Date().toString().slice(0, 15)
    ) {
      setWorkoutData({ title: temp?.title, data: tempData });
    }

    setGraphData(graphNewData);
    setSets(newData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const setDataHandler = async () => {
    setIsLoading(true);
    await createSet(
      token,
      selectedReps.toString(),
      selectedWeights.toString(),
      data.id
    );

    const response = await fetchSets(token, data.id);
    await fetchAllData(token);
    let newData = arrangeData(response);
    let temp = newData[newData?.length - 1];
    let tempData = temp?.data.sort(function (a, b) {
      return b.id - a.id;
    });
    if (
      new Date(temp?.title).toString().slice(0, 15) ===
      new Date().toString().slice(0, 15)
    ) {
      setWorkoutData({ title: temp?.title, data: tempData });
    }

    let graphNewData = arrangeDataGraph(newData);
    setGraphData(graphNewData);
    setSets(newData);
    setIsLoading(false);
  };

  const arrangeData = (data) => {
    let newData = [];
    let dates = {};

    if (data?.length > 0) {
      for (let i = 0; i < data?.length; i++) {
        if (dates[data[i]?.createdAt?.toString().split('T')[0]]) {
          dates[data[i]?.createdAt?.toString().split('T')[0]] += 1;
          //  let temp = { reps: data[i].reps, weight: data[i].weight };
          // console.log('data[i]', data[i]);

          let index = newData.findIndex((item) => {
            return (
              item?.title?.toString()?.split('T')[0] ==
              data[i]?.createdAt?.toString().split('T')[0]
            );
          });

          if (index >= 0) {
            newData[index]?.data.push(data[i]);
          }
        } else {
          dates[data[i].createdAt.toString().split('T')[0]] = 1;

          let temp = {
            title: data[i].createdAt.toString(),
            data: [data[i]],
          };
          newData.push(temp);
        }
      }
    }

    return newData;
  };
  const arrangeDataGraph = (data) => {
    let labels = [];
    let dataPoints = [];
    data.map((day) => {
      labels.push(new Date(day?.title)?.toString()?.slice(4, 15));
      let totalWeight = 0;
      day?.data?.map((set) => {
        let totalSet = set?.reps * parseFloat(set?.weight);
        totalWeight += totalSet;
      });
      dataPoints.push(totalWeight);
    });
    // console.log(labels);
    // console.log(dataPoints);
    return [labels, dataPoints];
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

  const renderItem = ({ item, index }) => (
    <Pressable
      bg="tertiary.700"
      justifyContent="space-around"
      py={3}
      borderColor="tertiary.900"
      _pressed={{
        bg: 'tertiary.700:alpha.20',
      }}
      borderBottomWidth="1"
      flexDirection="row"
    >
      <Badge // bg="red.400"
        bg="tertiary.600:alpha.60"
        rounded="full"
        variant="solid"
        _text={{
          fontSize: 12,
        }}
      >
        {workoutData?.data?.length - index}
      </Badge>

      <Heading size="sm"> {item?.reps}</Heading>

      <Heading size="sm"> {item?.weight}</Heading>
    </Pressable>
  );

  const textColor = useColorModeValue('#202124', '#FFFFFF');
  const bg = useColorModeValue('#FFFFFF', '#262626');

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

  console.log('workoutData -- ', workoutData);

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.4, y: 0.4 }}
        // Background Linear Gradient
        colors={['#000000', '#089f7f']}
        style={styles.image}
      >
        {isLoading ? (
          <IsLoading />
        ) : (
          <Center mb={56} mt={56}>
            <Center>
              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content bg="darkText:alpha.80" maxWidth="400px">
                  <Modal.CloseButton />
                  <Modal.Header bg="darkText:alpha.80" color="coolGray.100">
                    <Heading color="coolGray.100" size="sm">
                      {new Date(showData.title).toString().slice(0, 15)}
                    </Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <Box
                      flexDirection="row"
                      rounded="xl"
                      pb="2"
                      justifyContent="space-between"
                      w="full"
                    >
                      <Heading color="coolGray.100" size="sm">
                        Sets
                      </Heading>
                      <Heading color="coolGray.100" size="sm">
                        Reps
                      </Heading>

                      <Heading color="coolGray.100" size="sm">
                        Weight
                      </Heading>
                    </Box>

                    <Box justifyContent="space-between" rounded="xl" h="48">
                      <ScrollView>
                        {showData?.data?.map((item, index) => {
                          return (
                            <Box
                              key={index}
                              justifyContent="space-between"
                              flexDirection="row"
                              _text={{ color: 'white' }}
                              pb="2"
                            >
                              <Badge // bg="red.400"
                                bg="tertiary.600:alpha.60"
                                rounded="full"
                                variant="solid"
                                alignSelf="flex-end"
                                _text={{
                                  fontSize: 12,
                                }}
                              >
                                {index + 1}
                              </Badge>
                              <Heading color="coolGray.100" size="sm">
                                {' '}
                                {item?.reps}
                              </Heading>

                              <Heading color="coolGray.100" size="sm">
                                {' '}
                                {item?.weight}
                              </Heading>
                            </Box>
                          );
                        })}
                      </ScrollView>
                    </Box>
                  </Modal.Body>
                </Modal.Content>
              </Modal>
            </Center>

            <Heading
              mt={2}
              mb={8}
              size="md"
              textAlign="center"
              fontWeight="700"
              alignText="center"
              color="coolGray.100"
              _dark={{
                color: 'coolGray.100',
              }}
            >
              {graphData[1]?.length > 0
                ? route?.params?.name + ' Progress'
                : ' Add New Set'}
            </Heading>

            {graphData[1]?.length >= 1 && (
              <LineChart
                data={{
                  labels: graphData[0],
                  datasets: [
                    {
                      data: [...graphData[1]],
                    },
                  ],
                }}
                withVerticalLabels={false}
                withHorizontalLabels={false}
                width={Dimensions.get('window').width * 0.95}
                paddingLeft={'20'}
                height={Dimensions.get('window').height * 0.3}
                yAxisSuffix=" lb"
                yAxisInterval="2"
                verticalLabelRotation={30}
                horizontalLabelRotation={320}
                chartConfig={chartConfig}
                onDataPointClick={(data) => {
                  setShowData(sets[data?.index]);
                  setShowModal(true);
                }}
                bezier
              />
            )}

            <Box
              bg="tertiary.600:alpha.30"
              rounded="md"
              h={`${Dimensions.get('window').height * 0.3}px`}
              mt={12}
              w="full"
            >
              <WavyComponent />
              <HStack
                bg="tertiary.700"
                justifyContent="space-between"
                py={4}
                pl={4}
                pr={4}
              >
                <Heading alignSelf="center">
                  {new Date().toString().slice(0, 15)}
                </Heading>
                <Animatable.Text
                  animation="pulse"
                  easing="ease-in"
                  iterationCount="infinite"
                >
                  <IconButton
                    _pressed={{ bg: 'tertiary.500' }}
                    variant="solid"
                    bg="tertiary900:alpha.60"
                    rounded="full"
                    size="lg"
                    onPress={onOpenSet}
                    icon={
                      <Icon
                        as={FontAwesome5}
                        color="white"
                        name="plus"
                        size="sm"
                        mx={2}
                      />
                    }
                  />
                </Animatable.Text>
              </HStack>
              {workoutData?.data?.length >= 1 && (
                <Box
                  bg="tertiary.700"
                  flexDirection="row"
                  justifyContent="space-around"
                  borderColor="tertiary.900"
                  borderBottomWidth="1"
                  pb={2}
                >
                  <Heading size="sm">Sets</Heading>
                  <Heading size="sm">Reps</Heading>

                  <Heading size="sm">Weight</Heading>
                </Box>
              )}

              <SwipeListView
                keyExtractor={(item) => item.id}
                data={workoutData?.data?.reverse()}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-75}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
              />
            </Box>
          </Center>
        )}
        <HistoryActionSheet data={sets} isOpen={isOpen} onClose={onClose} />
        <RepsAndWeightSelector
          setSelectedReps={setSelectedReps}
          setSelectedWeights={setSelectedWeights}
          textColor={textColor}
          isOpen={isOpenSet}
          onClose={onCloseSet}
          bg={bg}
          setDataHandler={setDataHandler}
        />
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
export default WorkoutDetailsScreen;
