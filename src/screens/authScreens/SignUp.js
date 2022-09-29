import { View, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Button,
  VStack,
  FormControl,
  KeyboardAvoidingView,
  Box,
  Stack,
  Alert,
  Input,
  ScrollView,
  Icon,
  Pressable,
} from 'native-base';
import { apiGraphql } from '../../api/fetchingAxios';
import { useForm, Controller } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
function SignUpScreen() {
  const [apiErrors, setApiErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const authCtx = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  let pwd = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    // console.log('submiting with ', data);
    query = ` mutation createWorkoutUser($email:String!, $password:String!, $firstname:String!, $lastname:String!){
      createWorkoutUser(userInput:{email:$email, password:$password, firstname:$firstname,lastname:$lastname}){
        token
        userInfo{
          id
          firstname
          lastname
        email
        createdAt
          updatedAt
      }
        
     }
     }`;

    graphql = {
      graphql: {
        query: query,
        variables: {
          email: data?.email,
          password: data?.password,
          firstname: data?.firstname,
          lastname: data?.lastname,
        },
      },
    };

    const result = await apiGraphql(graphql);
    const token = result?.data?.createWorkoutUser?.token;
    setIsLoading(false);
    if (result?.errors) {
      setApiErrors([...result?.errors]);
    }
    if (token) {
      authCtx.authenticate(token);
      authCtx.setUserData(userInfo);
    }

    // console.log('good', result);
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.1, y: 0.1 }}
        // Background Linear Gradient
        colors={['#000000', '#089f7f']}
        style={styles.image}
      >
        <KeyboardAvoidingView
          h={{
            base: '5/6',
            lg: 'auto',
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView>
            <Center w="100%">
              <Stack space={3} w="100%" maxW="400">
                {apiErrors.map((err) => {
                  return (
                    <Alert w="100%" status="error" key={err.message}>
                      <HStack
                        flexShrink={1}
                        space={2}
                        justifyContent="space-between"
                      >
                        <Alert.Icon mt="1" />
                        <Text fontSize="md" color="coolGray.800">
                          {err.message}
                        </Text>
                      </HStack>
                    </Alert>
                  );
                })}
              </Stack>
              <Box safeArea p="2" w="90%" maxW="290" py="8">
                <Heading
                  size="lg"
                  color="coolGray.800"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  fontWeight="semibold"
                >
                  Welcome
                </Heading>
                <Heading
                  mt="1"
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  fontWeight="medium"
                  size="xs"
                >
                  Sign up to continue!
                </Heading>
                <VStack space={3} mt="5">
                  <FormControl isRequired isInvalid={'firstname' in errors}>
                    <FormControl.Label>First Name </FormControl.Label>
                    <Controller
                      control={control}
                      rules={{ required: 'Field is required', minLength: 4 }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          color="white"
                          onBlur={onBlur}
                          placeholder="John"
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="firstname"
                    />

                    <FormControl.ErrorMessage>
                      {errors?.firstname?.message}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl isRequired isInvalid={'lastname' in errors}>
                    <FormControl.Label>Last Name </FormControl.Label>
                    <Controller
                      control={control}
                      rules={{ required: 'Field is required', minLength: 4 }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          color="white"
                          onBlur={onBlur}
                          placeholder="Doe"
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="lastname"
                    />

                    <FormControl.ErrorMessage>
                      {errors?.lastname?.message}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl isRequired isInvalid={'email' in errors}>
                    <FormControl.Label>Email </FormControl.Label>
                    <Controller
                      control={control}
                      rules={{ required: 'Field is required', minLength: 4 }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          color="white"
                          onBlur={onBlur}
                          placeholder="JohnDoe@gmail.com"
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="email"
                    />

                    <FormControl.ErrorMessage>
                      {errors?.email?.message}
                    </FormControl.ErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={'password' in errors}>
                    <FormControl.Label>Password</FormControl.Label>
                    <Controller
                      control={control}
                      rules={{ required: 'Field is required', minLength: 4 }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          color="white"
                          onBlur={onBlur}
                          placeholder="Password"
                          type={show ? 'text' : 'password'}
                          InputRightElement={
                            <Pressable onPress={() => setShow(!show)}>
                              <Icon
                                as={
                                  <MaterialIcons
                                    name={
                                      show ? 'visibility' : 'visibility-off'
                                    }
                                  />
                                }
                                size={5}
                                mr="2"
                                color="muted.400"
                              />
                            </Pressable>
                          }
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="password"
                    />
                    <FormControl.ErrorMessage>
                      {errors?.password?.message}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={'confirmPassword' in errors}
                  >
                    <FormControl.Label>ConfirmPassword</FormControl.Label>
                    <Controller
                      control={control}
                      rules={{
                        required: 'Field is required',
                        minLength: 4,
                        validate: (value) =>
                          value === pwd || 'The passwords do not match',
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          color="white"
                          onBlur={onBlur}
                          placeholder="Confirm Password"
                          onChangeText={onChange}
                          type={show ? 'text' : 'password'}
                          InputRightElement={
                            <Pressable onPress={() => setShow(!show)}>
                              <Icon
                                as={
                                  <MaterialIcons
                                    name={
                                      show ? 'visibility' : 'visibility-off'
                                    }
                                  />
                                }
                                size={5}
                                mr="2"
                                color="muted.400"
                              />
                            </Pressable>
                          }
                          value={value}
                        />
                      )}
                      name="confirmPassword"
                    />
                    <FormControl.ErrorMessage>
                      {errors?.confirmPassword?.message}
                    </FormControl.ErrorMessage>
                  </FormControl>

                  <Button
                    isLoading={isLoading}
                    isLoadingText="Loading"
                    mt="4"
                    p="3"
                    _dark={{ colorScheme: 'blueGray' }}
                    colorScheme="blueGray"
                    bg="trueGray.400:alpha.70"
                    onPress={handleSubmit(onSubmit)}
                  >
                    <Heading size="sm"> Sign Un</Heading>
                  </Button>
                </VStack>
              </Box>
            </Center>
          </ScrollView>
        </KeyboardAvoidingView>
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
export default SignUpScreen;
