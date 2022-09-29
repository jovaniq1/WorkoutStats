import { View, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import {
  Text,
  Link,
  HStack,
  Center,
  Pressable,
  Icon,
  Heading,
  Button,
  VStack,
  FormControl,
  KeyboardAvoidingView,
  Box,
  Stack,
  Alert,
  Input,
} from 'native-base';
import { apiGraphql } from '../../api/fetchingAxios';
import { useForm, Controller } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { MaterialIcons } from '@expo/vector-icons';
function LoginScreen({ navigation }) {
  const [apiErrors, setApiErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const authCtx = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    query = ` query workoutLogin($email:String!, $password:String!){
      workoutLogin(email:$email, password:$password){
        token
        userInfo{
          id
          firstname
          lastname
        email
      }
     }
     }`;

    graphql = {
      graphql: {
        query: query,
        variables: {
          email: data?.email,
          password: data.password,
        },
      },
    };

    const result = await apiGraphql(graphql);
    const token = result?.data?.workoutLogin?.token;
    const userInfo = result?.data?.workoutLogin?.userInfo;
    setIsLoading(false);
    if (result?.errors) {
      setApiErrors([...result?.errors]);
    }
    if (token) {
      authCtx.authenticate(token);

      authCtx.setUserData(userInfo);
    }

    //console.log('good', result);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0.3, y: 0.1 }}
        // Background Linear Gradient
        colors={['#000000', '#089f7f']}
        style={styles.image}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={60}
        >
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
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading
                size="lg"
                textAlign="center"
                fontWeight="600"
                alignText="center"
                color="coolGray.800"
                _dark={{
                  color: 'warmGray.50',
                }}
              >
                Welcome
              </Heading>
              <Heading
                textAlign="center"
                mt="1"
                _dark={{
                  color: 'warmGray.200',
                }}
                color="coolGray.600"
                fontWeight="medium"
                size="xs"
              >
                Sign in to continue!
              </Heading>

              <VStack space={3} mt="5">
                <FormControl isRequired isInvalid={'email' in errors}>
                  <FormControl.Label>Email </FormControl.Label>
                  <Controller
                    control={control}
                    rules={{ required: 'Field is required', minLength: 4 }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        autoCapitalize="none"
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
                        onChangeText={onChange}
                        value={value}
                        type={show ? 'text' : 'password'}
                        InputRightElement={
                          <Pressable onPress={() => setShow(!show)}>
                            <Icon
                              as={
                                <MaterialIcons
                                  name={show ? 'visibility' : 'visibility-off'}
                                />
                              }
                              size={5}
                              mr="2"
                              color="muted.400"
                            />
                          </Pressable>
                        }
                      />
                    )}
                    name="password"
                  />
                  <FormControl.ErrorMessage>
                    {errors?.password?.message}
                  </FormControl.ErrorMessage>

                  <Link
                    _text={{
                      fontSize: 'xs',
                      fontWeight: '500',
                      color: 'blue.500',
                    }}
                    alignSelf="flex-end"
                    mt="1"
                  >
                    Forget Password?
                  </Link>
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
                  <Heading size="sm"> Sign in</Heading>
                </Button>
              </VStack>
            </Box>
          </Center>
        </KeyboardAvoidingView>
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
export default LoginScreen;
