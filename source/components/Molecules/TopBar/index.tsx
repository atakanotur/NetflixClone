import { useState } from 'react';
import { View, StyleSheet, Pressable, LayoutChangeEvent } from 'react-native';
import Animated, { SharedValue, useSharedValue } from 'react-native-reanimated';
import { Text } from '../../Atoms';
import colors from '@/source/theme/colors';
import responsiveFontSize from '@/source/theme/responsiveFontSize';
import localization from '@/source/lib/locales/localization';
import { MaterialIcons, Octicons, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
            <Animated.View style={[styles.topBarContainer, { height: height + top, paddingLeft: topBarPadding, paddingRight: topBarPadding }]}>
                <View style={styles.topBarProfile} onLayout={onLayoutTopBar}>
                    <Text text={profile.name} style={styles.profileName} />
                    <Text text={localization.t("for")} style={styles.for} />
                </View>
                <View style={styles.topBarIcons}>
                    <MaterialIcons name="cast" size={responsiveFontSize(30)} color={colors.white} style={styles.topBarIcon} />
                    <Octicons name="download" size={responsiveFontSize(30)} color={colors.white} style={styles.topBarIcon} />
                    <Ionicons name="search" size={responsiveFontSize(30)} color={colors.white} style={styles.topBarIcon} />
                </View>
                <BlurView style={styles.blurView} intensity={topBarBlurIntensity.value}></BlurView>
            </Animated.View>
            <Animated.View style={[styles.topBarButtons, { top: topBarButtonsPosition, opacity: topBarButtonsOpacity }]} onLayout={onLayoutTopBarButtons}>
                <Pressable style={styles.topBarButton}>
                    <Text text={localization.t("series")} style={styles.topBarButtonText} />
                </Pressable>
                <Pressable style={styles.topBarButton}>
                    <Text text={localization.t("movies")} style={styles.topBarButtonText} />
                </Pressable>
                <Pressable style={[styles.topBarButton, { flexDirection: 'row' }]}>
                    <Text text={localization.t("categories")} style={styles.topBarButtonText} />
                    <Ionicons name="chevron-down" size={responsiveFontSize(20)} color={colors.whiteGrey} style={{ marginLeft: 5 }} />
                </Pressable>
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    topBarContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        zIndex: 2,
    },
    topBarProfile: {
        flexDirection: 'row',
        padding: 5,
        zIndex: 1
    },
    topBarIcons: {
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
    topBarIcon: {
        marginLeft: 25
    },
    topBarButtons: {
        position: 'absolute',
        left: 0,
        right: 0,
        flexDirection: 'row',
        zIndex: 1
    },
    topBarButton: {
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
    topBarButtonText: {
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