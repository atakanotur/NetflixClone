import React from 'react';
import { StyleSheet, View } from 'react-native';
import Dot from './Dot';
import colors from '@/source/theme/colors';
import Constants from 'expo-constants';

type Props = {
    redDotIndex: number;
    data: readonly any[];
};

const Pagination = ({ data, redDotIndex }: Props) => {
    return (
        <View style={styles.container}>
            {data.map((_, index) => {

                return (
                    <Dot isRed={redDotIndex === index} key={index} />
                );
            })}
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: Constants.statusBarHeight + 50,
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0)",
        alignSelf: 'center'
    },
});