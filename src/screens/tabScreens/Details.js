import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {
  IconButton,
  ScrollView,
  Center,
  Spacer,
  Text,
  View,
  Heading,
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
import { RepsAndWeightSelector } from '../../components/workout/Selectors';
import { NewWorkoutActionSheet } from '../../components/home/NewWorkout';
import { DATA } from '../../utils/dummyData';
function Details({ navigation, route: params }) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclose();
  const {
    isOpen: isWorkoutOpen,
    onClose: isWorkoutOnClose,
    onToggle: isWorkoutOnToggle,
  } = useDisclose();
  let [language, setLanguage] = useState('key0');
  const [selectedReps, setSelectedReps] = useState(0);
  const [selectedWeights, setSelectedWeights] = useState(0);
  const [workoutData, setWorkoutData] = useState([]);
  const [data, setData] = useState([...DATA]);
  const [selectedWorkout, setSelectedWorkout] = useState('');
  //console.log('params', params);

  let category = [];
  let workout = [];
  const foundIdx1 = data.findIndex(
    (item) =>
      item?.category?.name?.toLowerCase() ===
      params.params.selectedCategory?.toLowerCase()
  );
  if (foundIdx1 >= 0) {
    category = data[foundIdx1];

    const foundIdx2 = category.findIndex(
      (item) =>
        item?.category?.name?.toLowerCase() ===
        params.params.selectedCategory?.toLowerCase()
    );
    workout = data[foundIdx2];

    const foundIdx = data.findIndex(
      (item) =>
        item?.category?.name?.toLowerCase() ===
        params.params.selectedCategory?.toLowerCase()
    );
  }
  if (!selectedCategory) selectedCategory = [];

  const setDataHandler = () => {
    let workoutSets = { reps: selectedReps, weight: selectedWeights };
    setWorkoutData((prev) => [...prev, workoutSets]);
  };
  const handleNewWorkout = () => {
    const foundIdx = data.findIndex(
      (item) =>
        item.category.name.toLowerCase() ===
        params.params.selectedCategory.toLowerCase()
    );

    let newWorkout = {
      workoutName: params.params.selectedWorkout,
      workouts: [],
    };
    setData((prev) => [
      ...prev,
      prev[foundIdx].category.exercises.push(newWorkout),
    ]);
    // setData((prev) => [...prev, newCategoryWorkout]);
  };

  const reps = Array.from({ length: 30 }, (_, i) => i + 1);
  const bg = useColorModeValue('#FFFFFF', '#262626');
  const textColor = useColorModeValue('#202124', '#FFFFFF');
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/workouts.jpg')}
        resizeMode="cover"
        style={styles.image}
        imageStyle={styles.imageCover}
      >
        <ScrollView mt="24">
          <RepsAndWeightSelector
            setSelectedReps={setSelectedReps}
            setSelectedWeights={setSelectedWeights}
            textColor={textColor}
            isOpen={isOpen}
            onClose={onClose}
            bg={bg}
            setDataHandler={setDataHandler}
          />
          <NewWorkoutActionSheet
            navigation={navigation}
            selectedCategory={params.params.selectedCategory}
            selectedWorkout={params.params.selectedWorkout}
            isOpen={isWorkoutOpen}
            onClose={isWorkoutOnClose}
            setSelectedWorkout={setSelectedWorkout}
            handleNewWorkout={handleNewWorkout}
            data={data}
            isWorkoutSelectorOnToggle={onToggle}
            textColor={textColor}
          />
          {workoutData &&
            workoutData.map((item, index) => (
              <Box alignItems="center" key={index}>
                <Pressable maxW="96" minW="72">
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <Box
                        bg={
                          isPressed
                            ? 'coolGray.200'
                            : isHovered
                            ? 'coolGray.200'
                            : 'coolGray.100'
                        }
                        style={{
                          transform: [
                            {
                              scale: isPressed ? 0.8 : 0.9,
                            },
                          ],
                        }}
                        p="2"
                        rounded="8"
                        shadow={3}
                        borderWidth="1"
                        borderColor="coolGray.300"
                      >
                        <HStack alignItems="center">
                          <Badge
                            colorScheme="darkBlue"
                            _text={{
                              color: 'white',
                            }}
                            variant="solid"
                            rounded="4"
                          >
                            {'Set ' + (index + 1).toString()}
                          </Badge>
                          <Spacer />
                          <Text fontSize={10} color="coolGray.800">
                            1 month ago
                          </Text>
                        </HStack>
                        <Center>
                          <Text
                            fontSize="16"
                            color="gray.500"
                            _dark={{
                              color: 'gray.600',
                            }}
                            mt="3"
                            fontWeight="medium"
                          >
                            Reps:{item.reps} Weight: {item.weight}
                          </Text>
                        </Center>

                        <Flex>
                          {isFocused ? (
                            <Text
                              mt="2"
                              fontSize={12}
                              fontWeight="medium"
                              textDecorationLine="underline"
                              color="darkBlue.600"
                              alignSelf="flex-start"
                            >
                              Read More
                            </Text>
                          ) : (
                            <Text
                              mt="2"
                              fontSize={12}
                              fontWeight="medium"
                              color="darkBlue.600"
                            >
                              Read More
                            </Text>
                          )}
                        </Flex>
                      </Box>
                    );
                  }}
                </Pressable>
              </Box>
            ))}

          <Center mt="0.5">
            {params?.params?.selectedSets !== workoutData.length && (
              <Button
                mt="8"
                size="lg"
                w="4/6"
                p="3"
                _dark={{ colorScheme: 'blueGray' }}
                bg="trueGray.400:alpha.70"
                onPress={onToggle}
              >
                {workoutData.length === 0 ? 'Begin' : 'Next '}
              </Button>
            )}
          </Center>
        </ScrollView>
      </ImageBackground>
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
  imageCover: {
    opacity: 0.99,
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
export default Details;
