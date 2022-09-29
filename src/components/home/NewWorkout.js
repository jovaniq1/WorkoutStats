import { StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { FontAwesome } from '@expo/vector-icons';
import {
  Center,
  Spacer,
  Text,
  Actionsheet,
  FormControl,
  Button,
  HStack,
  Box,
  FlatList,
  VStack,
  Input,
} from 'native-base';

export const NewWorkoutActionSheet = ({
  setSelectedWorkout,
  handleNewWorkout,
  exercises,
  isOpen,
  onClose,
  selectedWorkout,
  isWorkoutSelectorOnToggle,
  handleSelectedWorkout,
  navigation,
}) => {
  return (
    <Center>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content height={Platform.OS === 'ios' ? '700' : '500'}>
          <Box
            w="100%"
            px={4}
            justifyContent="center"
            display="flex"
            width="100%"
          >
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}
            >
              Workouts
            </Text>
            <Input
              onChangeText={(text) => null}
              value={selectedWorkout}
              variant="outline"
              w="100%"
              my={4}
              py="2"
              InputRightElement={
                <Button
                  size="xs"
                  rounded="none"
                  w="1/6"
                  h="full"
                  onPress={handleNewWorkout}
                >
                  Add
                </Button>
              }
              placeholder="New category"
            />
          </Box>

          <FlatList
            data={exercises}
            renderItem={({ item }) => (
              <Box
                BottomWidth="1"
                _dark={{
                  borderColor: 'muted.50',
                }}
                borderColor="muted.800"
                px={4}
                py={4}
              >
                <TouchableOpacity
                  onPress={async () => {
                    handleSelectedWorkout(item);
                    onClose();

                    isWorkoutSelectorOnToggle();
                  }}
                >
                  <HStack space={[2, 3]} justifyContent="space-between">
                    <VStack>
                      <Text
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        bold
                      >
                        {item?.name}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Text
                      fontSize="xs"
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                      alignSelf="flex-start"
                    >
                      Last: {item?.createdAt.toString().slice(0, 16)}
                    </Text>
                  </HStack>
                </TouchableOpacity>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};
export const WorkoutSelector = ({
  setSelectedSets,
  setSelectedReps,
  setSelectedWeights,
  isWorkoutOnToggle,
  isOpen,
  onClose,
  bg,

  navigation,
  isWorkoutSelectorOnToggle,
  isWorkoutOnClose,
  isCategoryOnClose,
  selectedWorkout,
}) => {
  const sets = Array.from({ length: 24 }, (_, i) => i + 1);
  const reps = Array.from({ length: 30 }, (_, i) => i + 1);
  const weights = Array.from({ length: 600 }, (_, i) => i * 2.5);
  const currentDate = new Date();

  console.log(selectedWorkout);
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content mb="0" pb="0">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
          height="10"
        >
          <Text
            fontSize="16"
            color="gray.500"
            _dark={{
              color: 'gray.300',
            }}
          >
            {currentDate.toString().split('GMT')[0]}
          </Text>
          <Button
            size="sm"
            py="0"
            mb="8"
            my="0"
            h="8"
            _dark={{ colorScheme: 'blueGray' }}
            bg="trueGray.400:alpha.70"
            onPress={() => {
              onClose();
              isWorkoutOnClose();
              isCategoryOnClose();
              return navigation.push('NewWorkout', {
                selectedWorkout,
                isWorkoutOnToggle,
              });
            }}
          >
            done
          </Button>
        </Box>
        <HStack display="flex" space={24} px="0" mx="0">
          <Text
            fontSize="16"
            color="gray.500"
            _dark={{
              color: 'gray.300',
            }}
          >
            Sets
          </Text>
          <Text
            fontSize="16"
            color="gray.500"
            _dark={{
              color: 'gray.300',
            }}
          >
            Reps
          </Text>
          <Text
            fontSize="16"
            color="gray.500"
            _dark={{
              color: 'gray.300',
            }}
          >
            Weight
          </Text>
        </HStack>
        <HStack px="4" mx="24">
          <Center>
            <WheelPickerExpo
              backgroundColor={bg}
              haptics={true}
              selectedStyle={{ borderColor: '#C0C0C0', borderWidth: 1 }}
              selectedItemTextSize={8}
              itemTextSize={9}
              height={190}
              width={150}
              initialSelectedIndex={2}
              items={sets.map((name) => ({ label: name, value: '' }))}
              onChange={({ item }) => setSelectedSets(item.label)}
            />
          </Center>

          <Center>
            <WheelPickerExpo
              backgroundColor={bg}
              haptics={true}
              selectedStyle={{ borderColor: '#C0C0C0', borderWidth: 1 }}
              selectedItemTextSize={8}
              itemTextSize={9}
              height={190}
              width={150}
              initialSelectedIndex={4}
              items={reps.map((name) => ({ label: name, value: '' }))}
              onChange={({ item }) => setSelectedReps(item.label)}
            />
          </Center>
          <Center>
            <WheelPickerExpo
              backgroundColor={bg}
              haptics={true}
              selectedStyle={{ borderColor: '#C0C0C0', borderWidth: 1 }}
              selectedItemTextSize={8}
              itemTextSize={9}
              height={190}
              width={150}
              initialSelectedIndex={3}
              items={weights.map((name) => ({ label: name, value: '' }))}
              onChange={({ item }) => setSelectedWeights(item.label)}
            />
          </Center>
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
