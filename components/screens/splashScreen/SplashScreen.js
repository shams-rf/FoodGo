import React from 'react';
import {lottieConfig} from "../../../assets/SplashScreen/LottieConfig";
import AnimatedLottieView from "lottie-react-native";

export function SplashScreen() {
    return (
        <AnimatedLottieView autoPlay loop source={lottieConfig.loading}/>
    );
}