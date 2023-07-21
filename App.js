import {useEffect, useState} from "react";
import * as Location from 'expo-location';
import {LocationDenied} from "./components/screens/LocationDenied";
import {WelcomeScreen} from "./components/screens/WelcomeScreen";
import {SplashScreen} from "./components/screens/splashScreen/SplashScreen";

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
        <WelcomeScreen/>
    )
  } else {
    return (
        <SplashScreen/>
    )
  }
}
