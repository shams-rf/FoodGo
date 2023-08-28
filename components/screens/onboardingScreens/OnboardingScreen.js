import React from 'react';
import {Image, Platform, View} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import {DoneButton} from "./DoneButton";
const chipsImg = require('../../../assets/icons/chips.gif')
const likeImg = require('../../../assets/icons/done.gif')

export function OnboardingScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Onboarding
                DoneButtonComponent={DoneButton}
                onDone={() => navigation.replace('Home')}
                showSkip={false}
                titleStyles={styles.title}
                subTitleStyles={styles.subtitle}
                bottomBarHighlight={false}
                showNext={false}
                pages={[
                {
                    backgroundColor: '#ff5c5c',
                    image: <Image style={styles.image} source={chipsImg} />,
                    title: 'Welcome to Halalicious',
                    subtitle: 'All your favourite food in one place',
                },
                {
                    backgroundColor: '#a30000',
                    image: <Image style={styles.image} source={likeImg} />,
                    title: 'Ready to go',
                    subtitle: 'Enable location access to show places near you',
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