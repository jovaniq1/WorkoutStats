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
import { WorkoutDetailsBox } from '../workout/WorkoutDetailsBox';

export const HistoryActionSheet = ({ isOpen, onClose, data }) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content w="full" bg="dark.50:alpha.95">
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

        <Heading size="lg" color="tertiary.600">
          History
        </Heading>

        <HStack display="flex" space={24} px="0" py={6} mx="0">
          <WorkoutDetailsBox data={data} />
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
