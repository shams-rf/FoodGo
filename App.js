import {useEffect, useState} from "react";
import * as Location from 'expo-location';
import {LocationDenied} from "./components/screens/locationDeniedScreen/LocationDenied";
import {MapScreen} from "./components/screens/mapScreen/MapScreen";
import {SplashScreen} from "./components/screens/splashScreen/SplashScreen";
import {OnboardingScreen} from "./components/screens/onboardingScreens/OnboardingScreen";

export default function App() {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted') {
        setError(true)
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)
    })();
  }, [])

  if(error) {
    return (
        <LocationDenied/>
    )
  } else if(location) {
    return (
        // <MapScreen location={location}/>
        <OnboardingScreen/>
    )
  } else {
    return (
        // <SplashScreen/>
        <OnboardingScreen/>
    )
  }
}
