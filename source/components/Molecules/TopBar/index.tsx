import React, { useCallback, useState } from 'react';
import { View, StyleSheet, LayoutChangeEvent, Pressable, Text as RNText } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
import { Text } from '../../Atoms';
import responsiveFontSize from '@/source/theme/responsiveFontSize';
import localization from '@/source/lib/locales/localization';
import { MaterialIcons, Octicons, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import CategoryList from '../CategoryList';
import { useAnimatedValues, animateContentTypeSelection, animateCategorySelection } from './animations';
import colors from '@/source/theme/colors';

type TopBarProps = {
    top: number
    profile: Profile
    categories: Category[]
    topBarPadding: SharedValue<number>
    topBarButtonsPosition: SharedValue<number>
    topBarButtonsOpacity: SharedValue<number>
    topBarBlurIntensity: SharedValue<number>
    setTopBarHeight: (event: LayoutChangeEvent) => void
    setTopBarButtonsHeight: (event: LayoutChangeEvent) => void
    onChangeContentType: (contentType: "movie" | "series" | "mixed") => void;
    onChangeCategory: (categoryId: string) => void;
}

const TopBar = ({ top, profile, categories, topBarPadding, topBarButtonsPosition, topBarButtonsOpacity, topBarBlurIntensity, setTopBarHeight, setTopBarButtonsHeight, onChangeContentType, onChangeCategory }: TopBarProps) => {
    const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const AnimatedRNText = Animated.createAnimatedComponent(RNText);

    const [currentContentType, setCurrentContentType] = useState<"movie" | "series" | "mixed">("mixed");

    const [categoryListVisible, setCategoryListVisible] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

    const [height, setHeight] = useState(0);

    const values = useAnimatedValues();

    const [seriesButtonWidth, setSeriesButtonWidth] = useState(0);
    const [moviesButtonWidth, setMoviesButtonWidth] = useState(0);
    const [xButtonWidth, setXButtonWidth] = useState(0);
    const [categoriesButtonWidth, setCategoriesButtonWidth] = useState(0);

    const selectContentType = useCallback((contentType: "movie" | "series" | "mixed") => {
        animateContentTypeSelection(contentType, currentContentType, xButtonWidth, seriesButtonWidth, moviesButtonWidth, values, onChangeContentType, setCurrentContentType);
    }, [xButtonWidth, seriesButtonWidth, moviesButtonWidth])

    const selectCategory = (categoryId: string) => {
        animateCategorySelection(categoryId, xButtonWidth, values, onChangeCategory, setSelectedCategoryId)
        onChangeCategory(categoryId);
    }

    const handleLayout = useCallback((setState: (value: number) => void) => (event: LayoutChangeEvent) => {
        setState(event.nativeEvent.layout.width);
    }, []);

    const handleLayoutTopBar = useCallback((event: LayoutChangeEvent) => {
        setTopBarHeight(event);
        setHeight(event.nativeEvent.layout.height);
        if (moviesButtonWidth !== 0 && categoriesButtonWidth === 0) {
            animateContentTypeSelection("mixed", currentContentType, xButtonWidth, seriesButtonWidth, moviesButtonWidth, values, onChangeContentType, setCurrentContentType);
        }
    }, [moviesButtonWidth]);

    return (
        <>
            <Animated.View style={[styles.container, { height: height + top, paddingHorizontal: topBarPadding }]}>
                <View style={styles.profile} onLayout={handleLayoutTopBar}>
                    <Text text={profile.name} style={styles.profileName} />
                    <Text text={localization.t("for")} style={styles.for} />
                </View>
                <View style={styles.icons}>
                    <MaterialIcons name="cast" size={responsiveFontSize(30)} color={colors.white} style={styles.icon} />
                    <Octicons name="download" size={responsiveFontSize(30)} color={colors.white} style={styles.icon} onPress={() => router.push({ pathname: "/downloads" })} />
                    <Ionicons name="search" size={responsiveFontSize(30)} color={colors.white} style={styles.icon} onPress={() => router.push({ pathname: "/search" })} />
                </View>
                <AnimatedBlurView style={[styles.blurView]} intensity={topBarBlurIntensity} />
            </Animated.View>
            <Animated.View style={[styles.buttons, { top: topBarButtonsPosition, opacity: topBarButtonsOpacity }]} onLayout={setTopBarButtonsHeight}>
                <AnimatedPressable onPress={() => selectContentType("mixed")} style={[styles.xButton, { zIndex: 7, left: values.xButtonLeft, opacity: values.xButtonOpacity }]} onLayout={handleLayout(setXButtonWidth)}>
                    <Ionicons name="close" size={responsiveFontSize(25)} color={colors.white} />
                </AnimatedPressable>
                <AnimatedPressable onPress={() => selectContentType("series")} style={[styles.button, { zIndex: 6, left: values.seriesButtonLeft, opacity: values.seriesButtonOpacity, backgroundColor: values.seriesButtonBackground }]} onLayout={handleLayout(setSeriesButtonWidth)}>
                    <AnimatedRNText style={[styles.buttonText, { color: values.seriesButtonTextColor }]}>
                        {localization.t("series")}
                    </AnimatedRNText>
                </AnimatedPressable>
                <AnimatedPressable onPress={() => selectContentType("movie")} style={[styles.button, { zIndex: 5, left: values.moviesButtonLeft, opacity: values.moviesButtonOpacity, backgroundColor: values.moviesButtonBackground }]} onLayout={handleLayout(setMoviesButtonWidth)}>
                    <AnimatedRNText style={[styles.buttonText, { color: values.moviesButtonTextColor }]}>
                        {localization.t("movies")}
                    </AnimatedRNText>
                </AnimatedPressable>
                <AnimatedPressable style={[styles.button, { flexDirection: 'row', zIndex: 4, left: values.categoriesButtonLeft, opacity: values.categoriesButtonOpacity }]} onLayout={handleLayout(setCategoriesButtonWidth)} onPress={() => setCategoryListVisible(true)}>
                    <Text text={localization.t("categories")} style={styles.buttonText} />
                    <Ionicons name="chevron-down" size={responsiveFontSize(20)} color={colors.whiteGrey} style={{ marginLeft: 5 }} />
                </AnimatedPressable>
                <AnimatedPressable style={[styles.button, { flexDirection: 'row', zIndex: 3, left: values.allCategoriesButtonLeft, opacity: values.allCategoriesButtonOpacity }]} onPress={() => setCategoryListVisible(true)}>
                    <Text text={localization.t("allCategories")} style={styles.buttonText} />
                    <Ionicons name="chevron-down" size={responsiveFontSize(20)} color={colors.whiteGrey} style={{ marginLeft: 5 }} />
                </AnimatedPressable>
                <AnimatedPressable style={[styles.button, { backgroundColor: values.categoryButtonBackground, zIndex: 2, left: values.categoryButtonLeft, opacity: values.categoryButtonOpacity, flexDirection: 'row' }]} onPress={() => setCategoryListVisible(true)}>
                    <Text text={categories.find((category) => category.id === selectedCategoryId)?.title} style={[styles.buttonText, { color: colors.white }]} />
                    <Ionicons name="chevron-down" size={responsiveFontSize(20)} color={colors.whiteGrey} style={{ marginLeft: 5 }} />
                </AnimatedPressable>
            </Animated.View>
            <CategoryList visible={categoryListVisible} setVisible={setCategoryListVisible} selectCategory={selectCategory} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        zIndex: 2,
    },
    profile: {
        flexDirection: 'row',
        padding: 5,
        zIndex: 1
    },
    icons: {
        flexDirection: 'row',
        padding: 5,
        zIndex: 1
    },
    profileName: {
        fontSize: responsiveFontSize(25),
        fontWeight: 'bold',
    },
    for: {
        fontSize: responsiveFontSize(25),
        fontWeight: 'bold',
        marginLeft: 5
    },
    icon: {
        marginLeft: 25
    },
    buttons: {
        position: 'absolute',
        left: 5,
        right: 0,
        zIndex: 1,
    },
    button: {
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: colors.whiteGrey,
        padding: 7,
        paddingLeft: 13,
        paddingRight: 13,
    },
    xButton: {
        width: 30,
        height: 30,
        padding: 0,
        paddingLeft: 0,
        paddingRight: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: colors.whiteGrey,
    },
    buttonText: {
        color: colors.whiteGrey,
        fontSize: responsiveFontSize(15),
        fontWeight: "bold"
    },
    blurView: {
        zIndex: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
})

export default TopBar;
