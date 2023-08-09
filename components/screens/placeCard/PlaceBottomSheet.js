import React, {useEffect, useRef} from 'react';
import {View} from "react-native";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import {PlaceCard} from "./PlaceCard";

export function PlaceBottomSheet(props) {
    const bottomSheetRef = useRef(null)
    const snapPoints = ['10%', '40%', '95%']

    useEffect(() => {
        if(props.place === null) {
            bottomSheetRef.current?.present()
        } else {
            bottomSheetRef.current?.snapToIndex(1)
        }
    }, [props.place])

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <BottomSheetModal
                enablePanDownToClose={false}
                snapPoints={snapPoints}
                ref={bottomSheetRef}
                index={0}
                backgroundStyle={{borderRadius: 50, backgroundColor: '#fff'}}
            >
                <PlaceCard location={props.location} place={props.place}/>
            </BottomSheetModal>
        </View>
    );
}