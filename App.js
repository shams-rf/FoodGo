import {Home} from "./Home";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {OnboardingScreen} from "./components/screens/onboardingScreens/OnboardingScreen";
import {Text, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useFonts} from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Rubik': require('./assets/fonts/Rubik.ttf'),
    'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Medium': require('./assets/fonts/Rubik-Medium.ttf'),
  })

  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync()
    }
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");

      if (appData == null) {
        setFirstLaunch(true);
        await AsyncStorage.setItem("appLaunched", "false");
      } else {
        setFirstLaunch(false);
      }
    }
    prepare().then().catch((error) => console.log(error))
    setData()
        .then()
        .catch((error) => console.log(error))
  }, [])

  const Stack = createNativeStackNavigator()

  if(!fontsLoaded) {
    return undefined
  } else {
    SplashScreen.hideAsync().then()
  }

  if(firstLaunch !== null) {
    if(firstLaunch) {
      return (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name={'Onboarding'} component={OnboardingScreen}/>
              <Stack.Screen name={'Home'} component={Home}/>
            </Stack.Navigator>
          </NavigationContainer>
      )
    } else {
      return (
          <Home/>
      )
    }
  }
  return (
      <View>
        <Text>Error</Text>
      </View>
  )
}
