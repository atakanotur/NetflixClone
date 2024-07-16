import { useState, useRef } from 'react';
import { View, Image, ScrollView, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { FlashList, ListRenderItem } from "@shopify/flash-list"
import { StyleSheet } from "react-native"
import { Text } from '../../Atoms';
import colors from '@/source/theme/colors';
import responsiveFontSize from '@/source/theme/responsiveFontSize';
import Pagination from './Pagination';
import Constants from "expo-constants";

const { height, width } = Dimensions.get('screen');

type LadingListItemProps = {
    image: string
    header: string
    description: string
    signUp: string
}

type LandingListProps = {
    data: readonly any[]
}

const renderItem: ListRenderItem<LadingListItemProps> = ({ item }) => {
    return (
        <View style={styles.renderItemContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={item.image} resizeMode='contain' />
            </View>
            <ScrollView style={styles.scrollView}>
                <Text text={item.header} style={styles.header} />
                <Text text={item.description} style={styles.description} />
                <Text text={item.signUp} style={styles.signUp} />
            </ScrollView>
        </View>
    )
}

const LandingList = ({ data }: LandingListProps) => {
    const listRef = useRef<FlashList<LadingListItemProps>>(null);
    const [paginationIndex, setPaginationIndex] = useState<number>(0);
    let currentPage = 0;

    const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newPage = Math.round(contentOffsetX / width);
        if (newPage !== currentPage) {
            currentPage = newPage;
            listRef.current?.scrollToIndex({ index: currentPage, animated: true });
        }
        setPaginationIndex(currentPage);
    };
    return (
        <View style={styles.container}>
            <FlashList
                ref={listRef}
                data={data}
                renderItem={renderItem}
                estimatedItemSize={300}
                horizontal
                pagingEnabled
                onMomentumScrollEnd={handleScrollEnd}
                showsHorizontalScrollIndicator={false}
            />
            <Pagination data={data} paginationIndex={paginationIndex} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height,
        width,
    },
    flashList: {
        flex: 1,
    },
    renderItemContainer: {
    },
    imageContainer: {
        width,
        height: height / 2,
        justifyContent: 'flex-end'
    },
    image: {
        width: width / 1.5,
        height: width / 1.5,
        alignSelf: 'center'
    },
    scrollView: {
        height: height / 2 - (Constants.statusBarHeight + 90),
        width,
        padding: 10
    },
    header: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: responsiveFontSize(35),
        padding: 10,
        textAlign: 'center'
    },
    description: {
        color: colors.white,
        fontWeight: "400",
        fontSize: responsiveFontSize(25),
        padding: 10,
        textAlign: 'center'
    },
    signUp: {
        color: colors.white,
        fontWeight: "400",
        fontSize: responsiveFontSize(25),
        padding: 10,
        textAlign: 'center'
    }
});

export default LandingList;