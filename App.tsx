import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import HomeScreen from './screens/HomeScreen'; 
import MenuEditScreen from './screens/MenuEditorScreen';
import CourseFilterScreen from './screens/CourseFilter';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/*Importing the code used in the Homescreen (Merino, 2020)*/ 
import { SafeAreaView } from 'react-native-safe-area-context';

//setting up interface(Murphy, 2023)
interface MenuItem {
  dishName: string;
  description: string;
  course: string;
  price: number;
}

const Stack = createStackNavigator();//(The IIE, 2024)


export default function App() {
  //Defining the menu state
  const [menu, setMenu] = useState<MenuItem[]>([]); //Initializing an array with state variables that will hold Menu item projects
  return (
    <NavigationContainer>
      {/*Passing props and menu states to the Homescreen (React Typescript Cheatsheet, 2024)*/}
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor:'gold'},
          headerTintColor: "#fff",
          headerTitleStyle:{fontWeight:"bold"},
        }}>
          <Stack.Screen name = "Home"
          options= {{
            title:'Home',

          }}
          >
            {(props)=> < HomeScreen{...props} menu = {menu} />} 
          </Stack.Screen>
          <Stack.Screen name = "MenuEditorScreen"
          options= {{
            title:'Menu Edit',

          }}
          >
            {(props)=> < MenuEditScreen{...props} menu = {menu} setMenu={setMenu} />} 
          </Stack.Screen>
          {/*Passing props to the menu edit screen, but also making it so the updated menu props replace the original if theres any changes made in the edit screen*/}
          <Stack.Screen name = "CourseFilter"
          options= {{
            title:'CourseFilter',

          }}
          >
            {(props) => < CourseFilterScreen {...props} menu ={menu} />}
          </Stack.Screen>

      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*Reference List 

Merino, J. (2020). How to Make an App With React Native | Setting up Navigation. 
[online] JasonMerino.me. 
Available at: https://jasonmerino.me/articles/how-to-make-an-app-with-react-native-setting-up-navigation 
[Accessed 7 Oct. 2024].

React Typescript Cheatsheet.2024. Typing Component Props | React TypeScript Cheatsheets. [online] Available at: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example/.

Murphy, C. (2023). TypeScript Interfaces: A Practical Guide with Code Examples. [online] prismic.io. Available at: https://prismic.io/blog/typescript-interfaces [Accessed 7 Oct. 2024].Reactnative.dev. (2022). Picker · React Native Archive. [online] Available at: https://archive.reactnative.dev/docs/picker [Accessed 7 Oct. 2024].Reactnative.dev. (2024a). FlatList · React Native. [online] Available at: https://reactnative.dev/docs/flatlist#listheadercomponent [Accessed 7 Oct. 2024].

The IIE. 2024. Mobile App Scripting[MAST5112 Module Manual].
 The Independent Institute of Education: Unpublished.*/

