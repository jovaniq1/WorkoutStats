import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { FontAwesome } from '@expo/vector-icons';
import {
  IconButton,
  ScrollView,
  Center,
  Spacer,
  Text,
  useToast,
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
  FormControl,
  Input,
  Alert,
  useColorModeValue,
  Stack,
} from 'native-base';
import { useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DataContext } from '../../context/dataContext';
import { AuthContext } from '../../context/authContext';
export const RepsAndWeightSelector = ({
  setSelectedReps,
  setSelectedWeights,
  setDataHandler,
  isOpen,
  onClose,
  bg,
}) => {
  const reps = Array.from({ length: 30 }, (_, i) => i + 1);
  const weights = Array.from({ length: 600 }, (_, i) => i * 2.5);
  const currentDate = new Date();

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
            size="md"
            py="0"
            mb="8"
            my="0"
            h="8"
            _dark={{ colorScheme: 'blueGray' }}
            bg="trueGray.400:alpha.70"
            onPress={() => {
              onClose();
              setDataHandler();
              //set data
            }}
          >
            Done
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
              selectedItemTextSize={9}
              itemTextSize={9}
              height={190}
              width={150}
              initialSelectedIndex={4}
              items={reps.map((name) => ({ label: name, value: '' }))}
              renderItem={(props) => (
                <Heading
                  style={[
                    styles.text,
                    {
                      fontSize: props.fontSize,
                      color: props.fontColor,
                      textAlign: props.textAlign,
                    },
                  ]}
                >
                  {props.label}
                </Heading>
              )}
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
              renderItem={(props) => (
                <Heading
                  style={[
                    styles.text,
                    {
                      fontSize: props.fontSize,
                      color: props.fontColor,
                      textAlign: props.textAlign,
                    },
                  ]}
                >
                  {props.label}
                </Heading>
              )}
              onChange={({ item }) => setSelectedWeights(item.label)}
            />
          </Center>
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
export const SetsSelector = ({
  setSelectedSets,
  selectedWorkout,
  selectedSets,
  selectedCategory,
  isOpen,
  onClose,
  bg,
  navigation,
  isWorkoutOnToggle,
}) => {
  const sets = Array.from({ length: 25 }, (_, i) => i + 1);
  const currentDate = new Date();

  const startFunction = () => {
    navigation.push('NewWorkout', {
      selectedSets,
      selectedWorkout,
      selectedCategory,
      isWorkoutOnToggle,
    });
    onClose();
  };

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
            onPress={() => startFunction()}
          >
            Start
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
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
export const SettingActionSheet = ({ isOpen, onClose, logout, userInfo }) => {
  const authCtx = useContext(AuthContext);
  const { UserData } = authCtx;
  console.log('UserData', UserData);
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content size="700px" w="full" bg="dark.50:alpha.95">
        <Heading size="lg" color="tertiary.600">
          Settings
        </Heading>
        <Button
          size="sm"
          variant="ghost"
          colorScheme="secondary"
          alignSelf="flex-end"
          top={-44}
          onPress={logout}
        >
          Sign Out
        </Button>

        <Box justifyContent="space-between" width="100%">
          <Box justifyContent="space-between" flexDirection="row" width="100%">
            <Center>
              <Heading size="md" color="muted.400" py={2}>
                Name
              </Heading>
              <Heading size="md" color="muted.400" py={2}>
                last Name
              </Heading>
              <Heading size="md" color="muted.400" py={2}>
                Email
              </Heading>
            </Center>
            <Center>
              <Heading color="muted.400" size="xs" py={2} px={8}>
                {UserData?.firstname}
              </Heading>
              <Heading size="xs" color="muted.400" py={2} px={8}>
                {UserData?.lastname}
              </Heading>
              <Heading size="xs" color="muted.400" py={2} px={8}>
                {UserData?.email}
              </Heading>
            </Center>
          </Box>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
export const AddActionSheet = ({
  isOpen,
  onClose,
  type,
  handleAdd,
  control,
  handleSubmit,
  errors,
  isLoading,
}) => {
  const handleSubmitData = (data) => {
    handleAdd(data);
    onClose();
  };
  const height = Dimensions.get('window').height * 0.7;

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content size={height} w="full" bg="dark.50:alpha.95">
        <Button
          py={0}
          my={0}
          top={-20}
          size="sm"
          variant="ghost"
          isLoadingText="Loading"
          onPress={onClose}
          alignSelf="flex-end"
          _text={{ color: 'secondary.800', fontSize: 'md' }}
        >
          Close
        </Button>
        <Box justifyContent="space-between" flexDirection="row" width="100%">
          <Heading size="lg" color="tertiary.600">
            New {type}
          </Heading>
        </Box>

        <Box justifyContent="space-between" width="100%">
          <Heading color="muted.400" size="xs">
            Enter a New {type}!
          </Heading>

          <FormControl isRequired isInvalid={type.toLowerCase() in errors}>
            <FormControl.Label> {type} </FormControl.Label>
            <FormControl.ErrorMessage alignItems="center" my={2}>
              {type === 'Category'
                ? errors?.category?.message
                : errors?.workout?.message}
            </FormControl.ErrorMessage>
            <Controller
              control={control}
              rules={{ required: 'Field is required', minLength: 3 }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoFocus={isOpen}
                  clearTextOnFocus
                  color="white"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  InputRightElement={
                    <Button
                      size="sm"
                      variant="ghost"
                      isLoading={isLoading}
                      isLoadingText="Loading"
                      onPress={handleSubmit(handleSubmitData)}
                      _text={{ color: 'tertiary.500', fontSize: 'md' }}
                    >
                      Add
                    </Button>
                  }
                />
              )}
              name={type.toLowerCase()}
            />
          </FormControl>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,

    fontWeight: 'bold',
  },
  selectedStyle1: { borderColor: '#202124', borderWidth: 2 },
  selectedStyle2: { borderColor: '#F00F00', borderWidth: 2 },
});
