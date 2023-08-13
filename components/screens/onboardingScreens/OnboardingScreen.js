import React from 'react';
import {Image, Platform, View} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import {colours} from "../../../config/Colours";
import {LocationPermissions} from "./LocationPermissions";
const chipsImg = require('../../../assets/icons/chips.gif')
const mosqueImg = require('../../../assets/icons/mosque.gif')
const likeImg = require('../../../assets/icons/done.gif')

export function OnboardingScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Onboarding
                onDone={() => navigation.replace('Home')}
                showSkip={false}
                titleStyles={styles.title}
                subTitleStyles={styles.subtitle}
                pages={[
                {
                    backgroundColor: '#faa0a0',
                    image: <Image style={styles.image} source={chipsImg} />,
                    title: 'Welcome to HalalGo',
                    subtitle: 'Find Halal restaurants near you',
                },
                {
                    backgroundColor: '#b1d8b7',
                    image: <Image style={styles.image} source={mosqueImg} />,
                    title: 'Location',
                    subtitle: <LocationPermissions/>,
                },
                {
                    backgroundColor: colours.green,
                    image: <Image style={styles.image} source={likeImg} />,
                    title: 'Done',
                    subtitle: 'Thank you for choosing FoodGo',
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
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    },
    subtitle: {
        fontSize: 16,
        fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'Roboto',
    }
}