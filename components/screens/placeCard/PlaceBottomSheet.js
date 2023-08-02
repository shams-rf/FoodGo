import React, {useRef} from 'react';
import {View} from "react-native";
import {BottomSheetModal} from "@gorhom/bottom-sheet";
import {MiniPlaceCard} from "./MiniPlaceCard";

export function PlaceBottomSheet(props) {
    const bottomSheetRef = useRef(null)
    const snapPoints = ['25%', '75%']
    function openBottomSheet() {
        bottomSheetRef.current?.present()
    }

    openBottomSheet()
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <BottomSheetModal
                enablePanDownToClose={false}
                snapPoints={snapPoints}
                ref={bottomSheetRef}
                index={0}
                backgroundStyle={{borderRadius: 50, backgroundColor: '#fff'}}
            >
                <MiniPlaceCard place={props.place}/>
            </BottomSheetModal>
        </View>
    );
}