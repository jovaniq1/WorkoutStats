import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  AspectRatio,
  SectionList,
  Heading,
  Center,
  Stack,
  Spacer,
  Box,
  Input,
  FlatList,
} from 'native-base';

export const WorkoutDetailsBox = ({ data }) => {
  return (
    <Center h="80" w="100%">
      {data.length > 0 && (
        <SectionList
          maxW="300"
          w="100%"
          mb="4"
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => (
            <Center py="4">
              <Text
                fontWeight="400"
                color="coolGray.100"
                _dark={{
                  color: 'coolGray.100',
                }}
              >
                Set {index + 1} {'  Reps: '}
                {item?.reps}
                {' Weight: '}
                {item?.weight}
                {' lbs'}
              </Text>
            </Center>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Center>
              <Heading
                fontSize="xl"
                mt="8"
                pb="4"
                color="coolGray.100"
                _dark={{
                  color: 'coolGray.100',
                }}
              >
                {new Date(title).toString()?.slice(0, 16)}
              </Heading>
            </Center>
          )}
        />
      )}
    </Center>
  );
};
