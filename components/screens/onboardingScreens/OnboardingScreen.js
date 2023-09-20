import React from 'react';
import {Image, View} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import {DoneButton} from "./DoneButton";
import {NextButton} from "./NextButton";
import {Title} from "./Title";
import {Subtitle} from "./Subtitle";
const chipsImg = require('../../../assets/onboarding/chips.gif')
const likeImg = require('../../../assets/onboarding/done.gif')

export function OnboardingScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Onboarding
                containerStyles={{bottom: '10%'}}
                bottomBarHeight={150}
                NextButtonComponent={NextButton}
                DoneButtonComponent={DoneButton}
                onDone={() => navigation.replace('Home')}
                showSkip={false}
                titleStyles={styles.title}
                subTitleStyles={styles.subtitle}
                bottomBarHighlight={false}
                pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image style={styles.image} source={chipsImg} />,
                    title: <Title title={'Welcome to Halalicious'}/>,
                    subtitle: <Subtitle text={'All your favourite food in one place'}/>,
                },
                {
                    backgroundColor: '#fff',
                    image: <Image style={styles.image} source={likeImg} />,
                    title: <Title title={'Ready to go'}/>,
                    subtitle: <Subtitle text={'Enable location access to show places near you'}/>,
                }
            ]}/>
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
    },
    image: {
        width: 200,
        height: 200
    }
}