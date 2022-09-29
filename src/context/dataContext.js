import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDisclose } from 'native-base';
import { createContext, useEffect, useState } from 'react';
import { apiGraphql } from '../api/fetchingAxios';

export const DataContext = createContext({
  categories: [],
  exercises: [],
  data: [],
  sets: [],
  apiErrors: [],
  isOpenAddCategory: false,
  onCloseAddCategory: () => {},
  onOpenAddCategory: () => {},
  onToggleAddCategory: () => {},
  isOpenAddWorkout: false,
  onCloseAddWorkout: () => {},
  onOpenAddWorkout: () => {},
  onToggleAddWorkout: () => {},
  isOpen: false,
  onClose: () => {},
  onOpen: () => {},
  onToggle: () => {},
  settingsIsOpen: false,
  isLoading: false,
  setIsLoading: (data) => {},
  settingsOnOpen: () => {},
  settingsOnClose: () => {},
  settingsOnToggle: () => {},
  createCategory: async (token, name) => {},
  createExercise: async (token, name, categoryId) => {},
  createSet: async (token, reps, weight, exerciseId) => {},
  fetchCategories: async (token) => {},
  fetchAllData: async (token) => {},
  fetchExercise: async (token, id) => {},
  fetchSets: async (token, id) => {},
});

function DataContextProvider({ children }) {
  const [visible, setVisible] = useState(true);
  const [categories, setCategories] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sets, setSets] = useState([]);
  const [data, setData] = useState([]);
  const [apiErrors, setApiErrors] = useState([]);
  const { isOpen, onOpen, onClose, onToggle } = useDisclose();
  const {
    isOpen: isOpenAddCategory,
    onOpen: onOpenAddCategory,
    onClose: onCloseAddCategory,
    onToggle: onToggleAddCategory,
  } = useDisclose();
  const {
    isOpen: settingsIsOpen,
    onOpen: settingsOnOpen,
    onClose: settingsOnClose,
    onToggle: settingsOnToggle,
  } = useDisclose();
  const {
    isOpen: isOpenAddWorkout,
    onOpen: onOpenAddWorkout,
    onClose: onCloseAddWorkout,
    onToggle: onToggleAddWorkout,
  } = useDisclose();

  useEffect(() => {
    let tempLoading = isLoading && visible;

    const timer = setTimeout(() => {
      setIsLoading(tempLoading);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const fetchCategories = async (token) => {
    query = ` query getCategories{
      getCategories{
        categories{
          name
          id
          createdAt
             } 
     }
     }`;

    graphql = {
      graphql: {
        query,
      },
      token,
    };

    const result = await apiGraphql(graphql);
    setCategories(result?.data?.getCategories.categories);
  };
  const fetchAllData = async (token) => {
    query = ` query getAllSets{
      getAllSets {
        sets{
     reps
     weight
     createdAt
     
     exercise{
            categoryId
            category{
              name
          }
            createdAt
             name
             id
     }
     id
        }  
        }
     }`;

    graphql = {
      graphql: {
        query,
      },
      token,
    };

    const result = await apiGraphql(graphql);
    setData(result?.data?.getAllSets?.sets);
    return result?.data?.getAllSets?.sets;
  };

  const fetchExercise = async (token, id) => {
    query = ` query getExercises($categoryId:ID!){
      getExercises(categoryId:$categoryId){
        exercises {
          categoryId
          createdAt
           name
           id
             } 
     }
     }`;

    graphql = {
      graphql: {
        query,
        variables: {
          categoryId: id,
        },
      },
      token,
    };

    const result = await apiGraphql(graphql);
    setExercises(result?.data?.getExercises.exercises);
  };
  const fetchSets = async (token, id) => {
    query = `query getSets($exerciseId:ID!){
      getSets(exerciseId:$exerciseId){
        sets{
          reps
          weight
          createdAt
          id
             }  
     }
     }`;

    graphql = {
      graphql: {
        query,
        variables: {
          exerciseId: id,
        },
      },
      token,
    };

    const result = await apiGraphql(graphql);
    setSets(result?.data?.getSets?.sets?.reverse());
    return result?.data?.getSets?.sets?.reverse();
  };
  const createCategory = async (token, name) => {
    query = ` mutation createCategory($name:String!){
      createCategory(name:$name){
          name
          id
          createdAt
             
     }
     }`;

    graphql = {
      graphql: {
        query,
        variables: {
          name: name,
        },
      },
      token,
    };

    const result = await apiGraphql(graphql);
    if (result?.errors) {
      setApiErrors([...result?.errors]);
      return [...result?.errors];
    }
    return [{ success: 'Added Successfully' }];
  };
  const createExercise = async (token, name, categoryId) => {
    query = ` mutation createExercise($name:String!, $categoryId:ID!){
      createExercise(name:$name, categoryId:$categoryId){
          name
          id
          createdAt
             
     }
     }`;

    graphql = {
      graphql: {
        query,
        variables: {
          name: name,
          categoryId: categoryId,
        },
      },
      token,
    };

    const result = await apiGraphql(graphql);
    if (result?.errors) {
      setApiErrors([...result?.errors]);
      return [...result?.errors];
    }
    return [{ success: 'Added Successfully' }];
  };
  const createSet = async (token, reps, weight, exerciseId) => {
    query = ` mutation createSets($reps:String!, $weight:String!, $exerciseId:ID!){
      createSets(reps:$reps,weight:$weight exerciseId:$exerciseId){

          id
          createdAt
             
     }
     }`;

    graphql = {
      graphql: {
        query,
        variables: {
          reps: reps,
          weight: weight,
          exerciseId: exerciseId,
        },
      },
      token,
    };

    const result = await apiGraphql(graphql);
    if (result?.errors) {
      setApiErrors([...result?.errors]);
      return [...result?.errors];
    }
    return [{ success: 'Added Successfully' }];
  };

  const value = {
    categories,
    exercises,
    sets,
    apiErrors,
    setIsLoading,
    isLoading,
    isOpen,
    onClose,
    onToggle,
    onOpen,
    isOpenAddWorkout,
    onCloseAddWorkout,
    onOpenAddWorkout,
    onToggleAddWorkout,
    isOpenAddCategory,
    onCloseAddCategory,
    onOpenAddCategory,
    onToggleAddCategory,
    settingsIsOpen,
    settingsOnOpen,
    settingsOnClose,
    settingsOnToggle,
    data,
    fetchAllData,
    fetchCategories: fetchCategories,
    fetchExercise: fetchExercise,
    fetchSets: fetchSets,
    createCategory: createCategory,
    createExercise: createExercise,
    createSet: createSet,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataContextProvider;
