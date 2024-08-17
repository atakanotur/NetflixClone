import { useEffect, useState } from 'react';
import { View, StyleSheet, LayoutChangeEvent, Pressable, Text as RNText } from 'react-native';
import Animated, { SharedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import { Text } from '../../Atoms';
import colors from '@/source/theme/colors';
import responsiveFontSize from '@/source/theme/responsiveFontSize';
import localization from '@/source/lib/locales/localization';
import { MaterialIcons, Octicons, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';

type TopBarProps = {
    top: number
    profile: Profile
    topBarPadding: SharedValue<number>
    topBarButtonsPosition: SharedValue<number>
    topBarButtonsOpacity: SharedValue<number>
    topBarBlurIntensity: SharedValue<number>
    setTopBarHeight: (event: LayoutChangeEvent) => void
    setTopBarButtonsHeight: (event: LayoutChangeEvent) => void
    onChangeContentType: (contentType: "movie" | "series" | "mixed") => void;
}

const TopBar = ({ top, profile, topBarPadding, topBarButtonsPosition, topBarButtonsOpacity, topBarBlurIntensity, setTopBarHeight, setTopBarButtonsHeight, onChangeContentType }: TopBarProps) => {
    const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const AnimatedRNText = Animated.createAnimatedComponent(RNText);

    const [currentContentType, setCurrentContentType] = useState<"movie" | "series" | "mixed">("mixed")

    const [height, setHeight] = useState(0);

    useEffect(() => {
        console.log("profile", profile)
    }, [profile])
    

    const [seriesButtonWidth, setSeriesButtonWidth] = useState(0);
    const seriesButtonLeft = useSharedValue(0);
    const seriesButtonOpacity = useSharedValue(1);
    const seriesButtonBackground = useSharedValue(colors.black);
    const seriesButtonTextColor = useSharedValue(colors.whiteGrey);

    const [moviesButtonWidth, setMoviesButtonWidth] = useState(0);
    const moviesButtonLeft = useSharedValue(0);
    const moviesButtonOpacity = useSharedValue(1);
    const moviesButtonBackground = useSharedValue(colors.black);
    const moviesButtonTextColor = useSharedValue(colors.whiteGrey);

    const [xButtonWidth, setXButtonWidth] = useState(0);
    const xButtonLeft = useSharedValue(-50);
    const xButtonOpacity = useSharedValue(0);

    const categoriesButtonLeft = useSharedValue(0);
    const categoriesButtonOpacity = useSharedValue(1);
    const [categoriesButtonWidth, setCategoriesButtonWidth] = useState(0);

    const allCategoriesButtonLeft = useSharedValue(0);
    const allCategoriesButtonOpacity = useSharedValue(0);

    const onLayoutTopBar = (event: LayoutChangeEvent) => {
        setTopBarHeight(event);
        setHeight(event.nativeEvent.layout.height);
        if (moviesButtonWidth !== 0 && categoriesButtonWidth === 0) selectContentType("mixed");
    };

    const onLayoutTopBarButtons = (event: LayoutChangeEvent) => {
        setTopBarButtonsHeight(event);
    }

    const onLayoutXButton = (event: LayoutChangeEvent) => {
        setXButtonWidth(event.nativeEvent.layout.width);
    }

    const onLayoutSeriesButton = (event: LayoutChangeEvent) => {
        setSeriesButtonWidth(event.nativeEvent.layout.width);
    }

    const onLayoutMoviesButton = (event: LayoutChangeEvent) => {
        setMoviesButtonWidth(event.nativeEvent.layout.width);
    }

    const onLayoutCategoriesButton = (event: LayoutChangeEvent) => {
        setCategoriesButtonWidth(event.nativeEvent.layout.width);
    }

    const selectContentType = (contentType: "movie" | "series" | "mixed") => {
        console.log("selectContentType", contentType);
        if (currentContentType !== contentType) {
            onChangeContentType(contentType);
            setCurrentContentType(contentType);
            if (contentType === "movie") {
                xButtonLeft.value = withSpring(0, { duration: 1350, dampingRatio: 0.7 });
                xButtonOpacity.value = withSpring(1, { duration: 750, dampingRatio: 0.7 });
                seriesButtonLeft.value = withSpring(-20, { duration: 1350, dampingRatio: 0.7 });
                seriesButtonOpacity.value = withSpring(0, { duration: 750, dampingRatio: 0.7 });
                seriesButtonBackground.value = withSpring(colors.black);
                seriesButtonTextColor.value = withSpring(colors.whiteGrey);
                moviesButtonLeft.value = withSpring(xButtonWidth + 10, { duration: 1350, dampingRatio: 0.7 });
                moviesButtonOpacity.value = withSpring(1, { duration: 750, dampingRatio: 0.7 });
                moviesButtonBackground.value = withSpring(colors.whiteGrey);
                moviesButtonTextColor.value = withSpring(colors.white);
                categoriesButtonLeft.value = withSpring(-20, { duration: 1350, dampingRatio: 0.7 });
                categoriesButtonOpacity.value = withSpring(0, { duration: 750, dampingRatio: 0.7 });
                allCategoriesButtonLeft.value = withSpring((xButtonWidth + moviesButtonWidth + 15), { duration: 1350, dampingRatio: 0.7 });
                allCategoriesButtonOpacity.value = withSpring(1, { duration: 750, dampingRatio: 0.7 });
                return;
            }
            if (contentType === "series") {
                xButtonLeft.value = withSpring(0, { duration: 1350, dampingRatio: 0.7 });
                xButtonOpacity.value = withSpring(1, { duration: 750, dampingRatio: 0.7 });
                seriesButtonLeft.value = withSpring(xButtonWidth + 10, { duration: 1350, dampingRatio: 0.7 });
                seriesButtonOpacity.value = withSpring(1, { duration: 750, dampingRatio: 0.7 });
                seriesButtonBackground.value = withSpring(colors.whiteGrey);
                seriesButtonTextColor.value = withSpring(colors.white);
                moviesButtonLeft.value = withSpring(-20, { duration: 1350, dampingRatio: 0.7 })
                moviesButtonOpacity.value = withSpring(0, { duration: 750, dampingRatio: 0.7 });
                moviesButtonBackground.value = withSpring(colors.black);
                moviesButtonTextColor.value = withSpring(colors.whiteGrey);
                categoriesButtonOpacity.value = withSpring(0, { duration: 750, dampingRatio: 0.7 });
                categoriesButtonLeft.value = withSpring(-20, { duration: 1350, dampingRatio: 0.7 });
                allCategoriesButtonOpacity.value = withSpring(1, { duration: 750, dampingRatio: 0.7 });
                allCategoriesButtonLeft.value = withSpring(xButtonWidth + moviesButtonWidth + 15, { duration: 1350, dampingRatio: 0.7 });
                return;
            }
        }
        onChangeContentType("mixed");
        setCurrentContentType("mixed");
        xButtonLeft.value = withSpring(-50, { duration: 1350, dampingRatio: 0.7 });
        xButtonOpacity.value = withSpring(0, { duration: 750, dampingRatio: 0.7 });
        seriesButtonLeft.value = withSpring(0, { duration: 1350, dampingRatio: 0.7 });
        seriesButtonOpacity.value = withSpring(1, { duration: 750, dampingRatio: 0.7 });
        seriesButtonBackground.value = withSpring(colors.black);
        seriesButtonTextColor.value = withSpring(colors.whiteGrey);
        moviesButtonLeft.value = withSpring((seriesButtonWidth + 5), { duration: 1350, dampingRatio: 0.7 });
        moviesButtonOpacity.value = withSpring(1, { duration: 750, dampingRatio: 0.7 });
        moviesButtonBackground.value = withSpring(colors.black);
        moviesButtonTextColor.value = withSpring(colors.whiteGrey);
        categoriesButtonLeft.value = withSpring((seriesButtonWidth + moviesButtonWidth + 10), { duration: 1350, dampingRatio: 0.7 });
        categoriesButtonOpacity.value = withSpring(1, { duration: 750, dampingRatio: 0.7 });
        allCategoriesButtonLeft.value = withSpring(-20, { duration: 1350, dampingRatio: 0.7 });
        allCategoriesButtonOpacity.value = withSpring(0, { duration: 750, dampingRatio: 0.7 });
    }

    return (
        <>
            <Animated.View style={[styles.container, { height: height + top, paddingLeft: topBarPadding, paddingRight: topBarPadding }]}>
                <View style={styles.profile} onLayout={onLayoutTopBar}>
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
            <Animated.View style={[styles.buttons, { top: topBarButtonsPosition, opacity: topBarButtonsOpacity }]} onLayout={onLayoutTopBarButtons}>
                <AnimatedPressable onPress={() => selectContentType("mixed")} style={[styles.xButton, { zIndex: 7, left: xButtonLeft, opacity: xButtonOpacity }]} onLayout={onLayoutXButton}>
                    <Ionicons name="close" size={responsiveFontSize(25)} color={colors.white} />
                </AnimatedPressable>
                <AnimatedPressable onPress={() => selectContentType("series")} style={[styles.button, { zIndex: 6, left: seriesButtonLeft, opacity: seriesButtonOpacity, backgroundColor: seriesButtonBackground }]} onLayout={onLayoutSeriesButton}>
                    <AnimatedRNText style={[styles.buttonText, { color: seriesButtonTextColor }]}>
                        {localization.t("series")}
                    </AnimatedRNText>
                </AnimatedPressable>
                <AnimatedPressable onPress={() => selectContentType("movie")} style={[styles.button, { zIndex: 5, left: moviesButtonLeft, opacity: moviesButtonOpacity, backgroundColor: moviesButtonBackground }]} onLayout={onLayoutMoviesButton}>
                    <AnimatedRNText style={[styles.buttonText, { color: moviesButtonTextColor }]}>
                        {localization.t("movies")}
                    </AnimatedRNText>
                </AnimatedPressable>
                <AnimatedPressable style={[styles.button, { flexDirection: 'row', zIndex: 4, left: categoriesButtonLeft, opacity: categoriesButtonOpacity }]} onLayout={onLayoutCategoriesButton}>
                    <Text text={localization.t("categories")} style={styles.buttonText} />
                    <Ionicons name="chevron-down" size={responsiveFontSize(20)} color={colors.whiteGrey} style={{ marginLeft: 5 }} />
                </AnimatedPressable>
                <AnimatedPressable style={[styles.button, { flexDirection: 'row', zIndex: 3, left: allCategoriesButtonLeft, opacity: allCategoriesButtonOpacity }]}>
                    <Text text={localization.t("allCategories")} style={styles.buttonText} />
                    <Ionicons name="chevron-down" size={responsiveFontSize(20)} color={colors.whiteGrey} style={{ marginLeft: 5 }} />
                </AnimatedPressable>
            </Animated.View >
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