import React from 'react';
import {Image, View} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
const chipsImg = require('../../../assets/icons/chips.gif')

export function OnboardingScreen() {
    return (
        <View style={styles.container}>
            <Onboarding pages={[
                {
                    backgroundColor: '#a6e4d0',
                    image: <Image style={styles.image} source={chipsImg} />,
                    title: 'Welcome',
                    subtitle: 'Welcome to the first slide of the Onboarding Swiper.'
                }
            ]}/>
        </View>
    );
}

const styles = {
    container: {
        flex: 1
    },
    image: {
        width: 300,
        height: 300
    }
}