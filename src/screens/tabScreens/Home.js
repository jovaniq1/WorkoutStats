import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  processColor,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ContributionGraph, StackedBarChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import {
  IconButton,
  Center,
  useToast,
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

import React, { useState, useEffect, useContext } from 'react';
import * as Haptics from 'expo-haptics';
import { AuthContext } from '../../context/authContext';
import { DataContext } from '../../context/dataContext';
import { DATA } from '../../utils/dummyData';
import { useForm, Controller, set } from 'react-hook-form';
import { WorkoutSelector } from '../../components/home/NewWorkout';
import {
  SetsSelector,
  SettingActionSheet,
} from '../../components/workout/Selectors';

import { RadarChart } from 'react-native-charts-wrapper';
import IsLoading from '../../components/isLoading/IsLoading';
function HomeScreen({ navigation }) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclose();
  const [selectedSets, setSelectedSets] = useState(0);
  const [commitsData, setCommitsData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedWorkout, setSelectedWorkout] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);

  const { settingsOnClose, settingsIsOpen, fetchCategories, fetchAllData } =
    dataCtx;
  const { token, logout } = authCtx;
  const getCategoriesAwait = async () => {
    setIsLoading(true);
    await fetchCategories(token);
    const response = await fetchAllData(token);
    preparedData(response);
    setData(response);

    setIsLoading(false);
  };

  useEffect(() => {
    getCategoriesAwait();
  }, []);

  let legend = {
    enabled: true,
    textSize: 14,
    form: 'CIRCLE',
    wordWrapEnabled: true,
  };
  let data2 = {
    $set: {
      dataSets: [
        {
          values: [
            { value: 100 },
            { value: 110 },
            { value: 105 },
            { value: 115 },
            { value: 110 },
          ],
          label: 'DS 1',
          config: {
            color: processColor('#FF8C9D'),

            drawFilled: true,
            fillColor: processColor('#FF8C9D'),
            fillAlpha: 100,
            lineWidth: 2,
          },
        },
        {
          values: [
            { value: 115 },
            { value: 100 },
            { value: 105 },
            { value: 110 },
            { value: 120 },
          ],
          label: 'DS 2',
          config: {
            color: processColor('#C0FF8C'),

            drawFilled: true,
            fillColor: processColor('#C0FF8C'),
            fillAlpha: 150,
            lineWidth: 1.5,
          },
        },
        {
          values: [
            { value: 105 },
            { value: 115 },
            { value: 121 },
            { value: 110 },
            { value: 105 },
          ],
          label: 'DS 3',
          config: {
            color: processColor('#8CEAFF'),

            drawFilled: true,
            fillColor: processColor('#8CEAFF'),
          },
        },
      ],
    },
  };

  let xAxis = {
    $set: {
      valueFormatter: ['A', 'B', 'C', 'D', 'E'],
    },
  };

  const bg = useColorModeValue('#FFFFFF', '#262626');
  const textColor = useColorModeValue('#202124', '#FFFFFF');
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const dayName = days[currentDate.getDay()];

  const AddButton = () => {
    return (
      <Center mt="2/4" bottom="0">
        <Box>
          <Box alignItems="center" minH={100}>
            <Stagger
              visible={isOpen}
              initial={{
                opacity: 0,
                scale: 0,
                translateY: 34,
              }}
              animate={{
                translateY: 0,
                scale: 1,
                opacity: 1,
                transition: {
                  type: 'spring',
                  mass: 0.8,
                  stagger: {
                    offset: 30,
                    reverse: true,
                  },
                },
              }}
              exit={{
                translateY: 34,
                scale: 1,
                opacity: 0,
                transition: {
                  duration: 100,
                  stagger: {
                    offset: 30,
                    reverse: true,
                  },
                },
              }}
            >
              <Stack
                direction="row"
                mb="2.5"
                mt="1.5"
                space={1}
                alignItems="center"
                justifyContent="center"
              >
                <IconButton
                  _pressed={{ bg: 'tertiary.500' }}
                  bg="muted.600:alpha.60"
                  mb={4}
                  variant="solid"
                  rounded="full"
                  onPress={() => {
                    null;
                  }}
                  icon={
                    <MaterialCommunityIcons
                      size={28}
                      name="library"
                      color="#059669"
                    />
                  }
                />
                <Text color="white">New Category</Text>
              </Stack>
              <Stack
                direction="row"
                mb="2.5"
                mt="1.5"
                space={1}
                alignItems="center"
                justifyContent="center"
              >
                <IconButton
                  _pressed={{ bg: 'tertiary.500' }}
                  bg="muted.600:alpha.60"
                  mb={4}
                  variant="solid"
                  rounded="full"
                  icon={
                    <MaterialCommunityIcons
                      size={28}
                      name="lighthouse"
                      color="#059669"
                    />
                  }
                />
                <Text color="white">New Workout</Text>
              </Stack>
            </Stagger>
          </Box>
          <Stack
            direction="row"
            mb="2.5"
            mt="1.5"
            space={1}
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              _pressed={{ bg: 'tertiary.500' }}
              variant="solid"
              bg="muted.600:alpha.60"
              rounded="full"
              size="lg"
              onPress={onToggle}
              icon={<FontAwesome5 name="dumbbell" size={28} color="#059669" />}
            >
              test
            </IconButton>
          </Stack>
        </Box>
      </Center>
    );
  };
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
  const preparedData = (response) => {
    const commitsData1 = [];
    setIsLoading(true);
    response.map((item) => {
      // console.log('workout=', item);
      let temp = {
        date: item.createdAt.toString().split('T')[0],
        count: 3,
        category: item?.exercise?.category?.name,
      };
      commitsData1.push(temp);
    });
    setCommitsData([...commitsData1]);
    setIsLoading(false);
  };

  const toast = useToast();
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.1, y: 0.3 }}
        // Background Linear Gradient
        colors={['#000000', '#089f7f']}
        style={styles.image}
      >
        {isLoading ? (
          <IsLoading />
        ) : (
          <Center mt="0.5">
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
              {dayName}
            </Heading>
            <ContributionGraph
              onDayPress={(day) => {
                toast.show({
                  render: () => {
                    return (
                      day?.category && (
                        <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                          <Center>{day?.category + ' on ' + day?.date}</Center>
                        </Box>
                      )
                    );
                  },
                });
              }}
              values={commitsData}
              endDate={new Date()}
              numDays={109}
              width={Dimensions.get('window').width}
              height={Dimensions.get('window').height * 0.3}
              chartConfig={chartConfig}
            />
          </Center>
        )}
        <SettingActionSheet
          logout={logout}
          isOpen={settingsIsOpen}
          onClose={settingsOnClose}
        />
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  imageCover: {
    opacity: 0.9,
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

export default HomeScreen;
