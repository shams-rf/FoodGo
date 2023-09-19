import React, {useEffect, useRef} from 'react';
import {View} from "react-native";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import {PlaceCard} from "./PlaceCard";
import {colours} from "../../../config/Colours";

export function PlaceBottomSheet(props) {
    const bottomSheetRef = useRef(null)
    const snapPoints = ['40%', '94%']

    useEffect(() => {
        if(props.place === null) {
            bottomSheetRef.current?.dismiss()
        } else {
            bottomSheetRef.current?.present()
            bottomSheetRef.current?.snapToIndex(0)
        }
    }, [props.place])

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <BottomSheetModal
                enablePanDownToClose={false}
                snapPoints={snapPoints}
                ref={bottomSheetRef}
                index={0}
                backgroundStyle={{borderRadius: 50, backgroundColor: colours.lightGray}}
            >
                <PlaceCard user={props.user} location={props.location} place={props.place}/>
            </BottomSheetModal>
        </View>
    );
}