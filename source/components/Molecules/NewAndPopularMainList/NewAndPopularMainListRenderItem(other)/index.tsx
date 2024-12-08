import { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import { Text } from '@/source/components/Atoms';
import colors from '@/source/theme/colors';
import { View, StyleSheet, Image } from 'react-native';
import VideoPlayer from '../../VideoPlayer';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import responsiveFontSize from '@/source/theme/responsiveFontSize';
import localization from '@/source/lib/locales/localization';
import moment from 'moment';
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated"

type NewAndPopularRenderItemProps = {
    selectedCategoryId: number
    content: ContentWithCategory
    index: number
    isInitialItem: boolean
}

export type NewAndPopularRenderItemRef = {
    scrollDate: (translateY: number) => void
}

const imageSource = "data:image/jpeg;base64,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"

const NewAndPopularMainListRenderItem = forwardRef(({ selectedCategoryId, content, isInitialItem, index }: NewAndPopularRenderItemProps, ref) => {
    useImperativeHandle(ref, () => ({
        scrollDate
    }))

    const containerRef = useRef<View>(null);
    const dateRef = useRef<View>(null);

    const [listAdded, setListAdded] = useState<boolean>(false);

    const isInitialItemOfCategory = (): boolean => {
        if (isInitialItem) return true
        return false
    }

    const getCategoryName = (): string => {
        if (content.categoryId === "newAndPopularCategory1") return localization.t("Very Soon")
        if (content.categoryId === "newAndPopularCategory2") return localization.t("Everyone is Watching These")
        if (content.categoryId === "newAndPopularCategory3") return localization.t("Top 10 Series List")
        return localization.t("Top 10 Movies List")
    }

    const getIconName = () => {
        if (selectedCategoryId === 0) return "popcorn"
        if (selectedCategoryId === 1) return "fire"
        return "numeric-10-box"
    }

    const dateTranslateY = useSharedValue(0);
    const dateContainerStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: dateTranslateY.value }]
    }))

    const scrollDate = (translateY: number) => {
        containerRef.current?.measure((containerX, containerY, containerWidth, containerHeight, containerPageX, containerPageY) => {
            console.log("containerY : ", containerPageY);
            dateRef.current?.measure((dateX, dateY, dateWidth, dateHeight, datePageX, datePageY) => {
                dateTranslateY.value = translateY - (containerPageY * index)
            })
        });
    }

    const calculatePositionOfDate = (containerHeight: number, dateHeight: number, containerY: number, translateY: number) => {
        const maxTranslateY = containerHeight - dateHeight;
        dateTranslateY.value = Math.max(0, Math.min(translateY, maxTranslateY));
    }


    return (
        <Animated.View ref={containerRef}>
            {isInitialItemOfCategory() &&
                <View style={styles.category}>
                    <MaterialCommunityIcons name={getIconName()} size={responsiveFontSize(22)} color={colors.red} style={styles.icon} />
                    <Text text={getCategoryName()} style={styles.categoryText} />
                </View>
            }
            <View style={styles.container}>
                {content.categoryId === "newAndPopularCategory1" &&
                    <Animated.View ref={dateRef} style={[styles.dateContainer, dateContainerStyle]}>
                        <Text text={moment().format("MMM").toUpperCase()} style={styles.dateMonth} />
                        <Text text={moment().format("D")} style={styles.dateDay} />
                    </Animated.View>
                }
                <View>
                    <VideoPlayer fullscreen={false} videoSource={content.trailer} visible />
                    <View style={styles.bannerAndIcons}>
                        <Image source={{ uri: imageSource }} resizeMode='stretch' style={{ flex: 1 }} />
                        <View style={styles.icons}>
                            <View style={styles.iconAndTitle}>
                                <Ionicons name="paper-plane-outline" size={responsiveFontSize(25)} color={colors.whiteGrey} />
                                <Text text={localization.t("recommend")} style={styles.iconTitle} />
                            </View>
                            <View style={styles.iconAndTitle}>
                                <Ionicons name={listAdded ? "checkmark" : "add"} size={responsiveFontSize(25)} color={colors.whiteGrey} />
                                <Text text={localization.t("myList")} style={styles.iconTitle} />
                            </View>
                            <View style={styles.iconAndTitle}>
                                <Ionicons name="play-sharp" size={responsiveFontSize(25)} color={colors.whiteGrey} />
                                <Text text={localization.t("play")} style={styles.iconTitle} />
                            </View>
                        </View>
                    </View>
                    <Text text={content.title} style={styles.title} />
                    <Text text={content.plot} style={styles.plot} />
                    <Text text='Drama•Clever Dialogue•Suffering Genius•Medical Themed•Series' style={styles.categories} />
                </View>
            </View>
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    dateContainer: {
        height: 100,
        width: 50,
        alignItems: 'center',
    },
    dateMonth: {
        color: colors.whiteGrey,
        fontSize: responsiveFontSize(15),
    },
    dateDay: {
        color: colors.white,
        fontSize: responsiveFontSize(30),
        fontWeight: "800"
    },
    bannerAndIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    icons: {
        flexDirection: 'row',
    },
    iconAndTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    iconTitle: {
        fontSize: responsiveFontSize(10),
        padding: 5
    },
    title: {
        color: colors.white,
        fontWeight: "bold",
        marginVertical: 5
    },
    plot: {
        color: colors.whiteGrey,
        fontSize: responsiveFontSize(15),
        marginVertical: 5
    },
    categories: {
        color: colors.whiteGrey,
        fontSize: responsiveFontSize(12),
        marginVertical: 5
    },
    category: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    categoryText: {
        fontWeight: "bold",
        fontSize: responsiveFontSize(22)
    },
    icon: {
        marginRight: 10
    }
})

export default NewAndPopularMainListRenderItem;