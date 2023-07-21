import { StyleSheet, View } from 'react-native';
import AnimatedLottieView from "lottie-react-native";
import {lottieConfig} from "./assets/SplashScreen/LottieConfig";

export default function App() {
  return (
    <View style={styles.container}>
      <AnimatedLottieView autoPlay loop source={lottieConfig.loading}/>
    </View>
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
