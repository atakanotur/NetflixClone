import { useState, useRef } from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, NativeScrollEvent, NativeSyntheticEvent, Text as ReactNativeText, Linking } from 'react-native';
import { FlashList, ListRenderItem } from "@shopify/flash-list"
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
            {item.image ? (
                <>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={item.image} resizeMode='contain' />
                    </View>
                    <ScrollView style={styles.scrollView}>
                        <Text text={item.header} style={styles.header} adjustsFontSizeToFit={true} />
                        <Text text={item.description} style={styles.description} adjustsFontSizeToFit={true} />
                        <ReactNativeText style={styles.signUp}>
                            <ReactNativeText onPress={() => Linking.openURL("https://www.netflix.com/more")} style={styles.more}>
                                netflix.com/more
                            </ReactNativeText>
                            {" " + item.signUp}
                        </ReactNativeText>
                    </ScrollView>
                </>
            ) : (
                <View style={styles.noImageContainer}>
                    <Text text={item.header} style={styles.header} adjustsFontSizeToFit={true} />
                    <Text text={item.description} style={styles.description} adjustsFontSizeToFit={true} />
                    <ReactNativeText style={styles.signUp}>
                        <ReactNativeText onPress={() => Linking.openURL("https://www.netflix.com/more")} style={styles.more}>
                            netflix.com/more
                        </ReactNativeText>
                        {" " + item.signUp}
                    </ReactNativeText>
                </View>
            )}
        </View>
    )
}

const LandingList = ({ data }: LandingListProps) => {
    const listRef = useRef<FlashList<LadingListItemProps>>(null);
    const [redDotIndex, setRedDotIndex] = useState<number>(0);
    let currentPage = 0;

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const contentWidth = event.nativeEvent.contentSize.width;
        const newPage = Math.round(contentOffsetX / width);
        if (newPage !== currentPage) {
            currentPage = newPage;
            listRef.current?.scrollToIndex({ index: currentPage, animated: true });
        }
        setRedDotIndex(newPage);
    }

    return (
        <View style={styles.container}>
            <FlashList
                ref={listRef}
                data={data}
                renderItem={renderItem}
                estimatedItemSize={300}
                horizontal
                pagingEnabled
                onScroll={handleScroll}
                showsHorizontalScrollIndicator={false}
            />
            <Pagination redDotIndex={redDotIndex} data={data} />
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
        height,
        width,
    },
    noImageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        padding: 10,
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
    more: {
        color: colors.blue,
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
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default LandingList;