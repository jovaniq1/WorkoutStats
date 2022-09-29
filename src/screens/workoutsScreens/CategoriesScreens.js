import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as Animatable from 'react-native-animatable';
import {
  Text,
  Alert,
  HStack,
  Center,
  Heading,
  Stack,
  KeyboardAvoidingView,
  Button,
  VStack,
  Spacer,
  Box,
  Icon,
  Pressable,
  useToast,
} from 'native-base';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { DataContext } from '../../context/dataContext';
import IsLoading from '../../components/isLoading/IsLoading';
import { useForm, Controller } from 'react-hook-form';
import { AddActionSheet } from '../../components/workout/Selectors';
import WavyComponent from '../../components/workout/WavyComponent';
function CategoriesScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: '',
    },
  });
  const {
    fetchCategories,
    categories,
    createCategory,
    data,
    isOpenAddCategory,
    apiErrors,
    onCloseAddCategory,
  } = dataCtx;
  const { token } = authCtx;
  const toast = useToast();

  const handleCreateNewCategory = async (data) => {
    setIsLoading(true);

    const response = await createCategory(token, data.category);
    await fetchCategories(token);

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
  const fetchingData = async () => {
    setIsLoading(true);
    await fetchCategories(token);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchingData();
  }, []);

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
        navigation.push('Workouts', item);
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

  const LatestComponent = (name) => {
    let foundData = latest.filter((item) => {
      return (
        item?.exercise?.category?.name.toLowerCase() ===
        name?.name?.toLowerCase()
      );
    });

    return (
      <HStack space={[12, 3]} justifyContent="space-between">
        <VStack>
          <Text
            color="coolGray.100"
            _dark={{
              color: 'coolGray.100',
            }}
            bold
          >
            Latest:{' '}
            {foundData.length > 0 ? foundData[0]?.exercise?.name : ' None'}
          </Text>
        </VStack>
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
          {foundData.length > 0
            ? new Date(foundData[0]?.createdAt).toString().slice(0, 16)
            : ''}
        </Text>
      </HStack>
    );
  };

  let labels = [];
  let hash = {};
  for (let i = 0; i < data.length; i++) {
    let category = data[i]?.exercise?.category?.name;

    if (hash[category]) {
      hash[category] = hash[category] + 1;
    } else {
      hash[category] = 1;
    }
  }
  let dataSets = [];
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i]?.name;
    if (hash[category]) {
      labels.push(category);
      dataSets.push(hash[category]);
    } else {
      labels.push(category);
      dataSets.push(0);
    }
  }

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
  const data2 = {
    labels: ['legs', 'arms', 'back', 'Delts', 'test'], // optional
    data: [0.9, 0.2, 0.5, 0.5, 0.9],
  };
  console.log('errors', apiErrors);
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.9, y: 0.4 }}
        // Background Linear Gradient
        colors={['#000000', '#089f7f']}
        style={styles.image}
      >
        {isLoading ? (
          <IsLoading />
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={60}
          >
            <Center mb={56} mt={40}>
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
                  Add New Category
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
                isOpen={isOpenAddCategory}
                onClose={onCloseAddCategory}
                type="Category"
                handleAdd={handleCreateNewCategory}
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
                    borderBottomWidth="1"
                  >
                    Categories
                  </Heading>
                </Box>
                <SwipeListView
                  data={categories}
                  renderItem={renderItem}
                  renderHiddenItem={renderHiddenItem}
                  rightOpenValue={-75}
                  previewRowKey={'0'}
                  previewOpenValue={-40}
                  previewOpenDelay={3000}
                />
              </Box>
            </Center>
          </KeyboardAvoidingView>
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
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});
export default CategoriesScreen;
// renderItem={({ item, index }) => (
//   <Box
//     _dark={{
//       borderColor: 'muted.50',
//     }}
//     borderColor="muted.800"
//     px={0}
//     py={4}
//   >
//     <TouchableOpacity
//       onPress={() => {
//         navigation.push('Workouts', item);
//       }}
//     >
//       <HStack justifyContent="space-between">
//         <VStack>
//           <Text
//             color="coolGray.100"
//             _dark={{
//               color: 'coolGray.100',
//             }}
//             bold
//           >
//             {item.name}
//           </Text>
//         </VStack>
//         <Spacer />
//       </HStack>
//       <LatestComponent name={item.name} />
//     </TouchableOpacity>
//   </Box>
// )}
