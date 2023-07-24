import React from 'react';
import {lottieConfig} from "../../../assets/SplashScreen/LottieConfig";
import AnimatedLottieView from "lottie-react-native";
import {Platform, Text, View} from "react-native";

export function SplashScreen() {
    return (
        <View style={styles.container}>
            {/*<AnimatedLottieView style={styles.animation} autoPlay loop source={lottieConfig.loading}/>*/}
            <Text style={styles.loadingText}>Please wait while we locate you!</Text>
        </View>
    );
}

const styles = {
    container: {
        backgroundColor: '#98bad5',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    },
    animation: {
        height: 300
    }
}