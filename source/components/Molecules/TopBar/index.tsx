import { useState } from 'react';
import { View, StyleSheet, Pressable, LayoutChangeEvent } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
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
}

const TopBar = ({ top, profile, topBarPadding, topBarButtonsPosition, topBarButtonsOpacity, topBarBlurIntensity, setTopBarHeight, setTopBarButtonsHeight }: TopBarProps) => {
    const [height, setHeight] = useState(0);

    const onLayoutTopBar = (event: LayoutChangeEvent) => {
        setTopBarHeight(event);
        const { height } = event.nativeEvent.layout;
        setHeight(height);
    };
    const onLayoutTopBarButtons = (event: LayoutChangeEvent) => {
        setTopBarButtonsHeight(event);
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
                <BlurView style={styles.blurView} intensity={topBarBlurIntensity.value}></BlurView>
            </Animated.View>
            <Animated.View style={[styles.buttons, { top: topBarButtonsPosition, opacity: topBarButtonsOpacity }]} onLayout={onLayoutTopBarButtons}>
                <Pressable style={styles.button}>
                    <Text text={localization.t("series")} style={styles.buttonText} />
                </Pressable>
                <Pressable style={styles.button}>
                    <Text text={localization.t("movies")} style={styles.buttonText} />
                </Pressable>
                <Pressable style={[styles.button, { flexDirection: 'row' }]}>
                    <Text text={localization.t("categories")} style={styles.buttonText} />
                    <Ionicons name="chevron-down" size={responsiveFontSize(20)} color={colors.whiteGrey} style={{ marginLeft: 5 }} />
                </Pressable>
            </Animated.View>
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
        left: 0,
        right: 0,
        flexDirection: 'row',
        zIndex: 1
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: colors.whiteGrey,
        marginLeft: 5,
        marginTop: 10,
        padding: 5,
        paddingLeft: 13,
        paddingRight: 13
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