import {Home} from "./Home";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {OnboardingScreen} from "./components/screens/onboardingScreens/OnboardingScreen";
import {Text, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

export default function App() {
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");

      if (appData == null) {
        setFirstLaunch(true);
        await AsyncStorage.setItem("appLaunched", "false");
      } else {
        setFirstLaunch(false);
      }
    }
    setData()
        .then()
        .catch((error) => console.log(error))
  }, [])

  const Stack = createNativeStackNavigator()

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
