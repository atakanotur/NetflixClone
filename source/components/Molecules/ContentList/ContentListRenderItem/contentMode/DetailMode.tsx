import { useState, forwardRef, LegacyRef } from 'react';
import { View, ScrollView, Pressable, StyleSheet, Dimensions, StyleProp, ViewStyle } from "react-native"
import localization from "@/source/lib/locales/localization"
import colors from "@/source/theme/colors"
import responsiveFontSize from "@/source/theme/responsiveFontSize"
import { Ionicons, MaterialIcons, Octicons, Feather } from "@expo/vector-icons"
import VideoPlayer from '../../../VideoPlayer';
import { Text } from "../../../../Atoms"
import Constant from 'expo-constants';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import ContentTabSelector from './ContentTabSelector';

type DetailModeProps = {
    scrollViewRef?: LegacyRef<ScrollView>;
    content: Series | Movie;
    containerStyle: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
    onClose: () => void;
}

const { width, height } = Dimensions.get("window");
const { statusBarHeight } = Constant;

const DetailMode = forwardRef(({ scrollViewRef, content, onClose, containerStyle }: DetailModeProps, ref) => {

    const [fullscreen, setFullscreen] = useState<boolean>(false);

    const [listAdded, setListAdded] = useState<boolean>(false);


    const animateClose = () => {
        onClose();
    }

    return (
        <Animated.View style={containerStyle}>
            <Ionicons name="close" size={responsiveFontSize(24)} color={colors.white} onPress={animateClose} style={styles.closeIcon} />
            <VideoPlayer
                fullscreen={fullscreen}
                videoSource={content.trailer}
                visible={true}
                style={styles.video} />
            <ScrollView ref={scrollViewRef} style={styles.detailModeInformationContainer} contentContainerStyle={styles.detailModeInformationContainerContent} showsVerticalScrollIndicator={false}>
                <Text text={content.title} style={styles.contentTitle} />
                <View style={styles.yearAndSeasonNumberOrMovieDuration}>
                    <Text text={content.year.toString()} style={styles.year} />
                    <MaterialIcons name='18-up-rating' size={responsiveFontSize(24)} style={styles.yearAndSeasonNumberOrMovieDurationIcon} />
                    <Text text={content.type === "movie" ? "2 h. 11 min." : content.numberOfSeasons + " Season"} style={styles.seasonNumberOrMovieDuration} />
                    <MaterialIcons name='hd' size={responsiveFontSize(24)} style={styles.yearAndSeasonNumberOrMovieDurationIcon} />
                </View>
                <View style={styles.playAndDownloadContainer}>
                    <Pressable style={[styles.playAndDownloadButton, { backgroundColor: colors.white }]}>
                        <Ionicons name="play-sharp" size={responsiveFontSize(25)} color={colors.black} />
                        <Text text={localization.t("play")} style={styles.play} />
                    </Pressable>
                    <Pressable style={[styles.playAndDownloadButton, { backgroundColor: colors.grey }]}>
                        <Octicons name="download" size={responsiveFontSize(20)} color={colors.white} />
                        <Text text={localization.t("download")} style={styles.download} />
                    </Pressable>
                </View>
                <Text text={content.plot} style={styles.plot} />
                <Text text={`${localization.t("cast")} : ${content.cast}`} style={styles.cast} />
                <Text text={`${localization.t("creator")} : ${content.creator}`} style={styles.creator} />
                <View style={styles.actionButtonContainer}>
                    <Pressable style={styles.actionButton}>
                        <Ionicons name={listAdded ? "checkmark" : "add"} size={responsiveFontSize(25)} color={colors.whiteGrey} />
                        <Text text={localization.t("myList")} style={styles.actionButtonText} />
                    </Pressable>
                    <Pressable style={styles.actionButton}>
                        <Feather name="thumbs-up" size={responsiveFontSize(25)} color={colors.whiteGrey} />
                        <Text text={localization.t("giveScore")} style={styles.actionButtonText} />
                    </Pressable>
                    <Pressable style={styles.actionButton}>
                        <Ionicons name="paper-plane-outline" size={responsiveFontSize(25)} color={colors.whiteGrey} />
                        <Text text={localization.t("recommend")} style={styles.actionButtonText} />
                    </Pressable>
                </View>
                <ContentTabSelector content={content} />
            </ScrollView>
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    video: {
    },
    detailModeInformationContainer: {
        backgroundColor: colors.darkGrey,
        padding: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    detailModeInformationContainerContent: {
        flexGrow: 1,
        paddingBottom: statusBarHeight * 2,
    },
    closeIcon: {
        position: "absolute",
        right: 10,
        top: statusBarHeight + 10,
        zIndex: 10
    },
    videoContainer: {
    },
    contentTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.white
    },
    yearAndSeasonNumberOrMovieDuration: {
        flexDirection: "row",
        alignItems: 'center'
    },
    yearAndSeasonNumberOrMovieDurationIcon: {
        color: colors.whiteGrey,
        paddingHorizontal: 5
    },
    year: {
        color: colors.white,
        fontSize: responsiveFontSize(16)
    },
    seasonNumberOrMovieDuration: {
        color: colors.white,
        fontSize: responsiveFontSize(16)
    },
    playAndDownloadContainer: {

    },
    playAndDownloadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        marginVertical: 5,
        borderRadius: 5
    },
    play: {
        color: colors.black,
        marginLeft: 5
    },
    download: {
        marginLeft: 10
    },
    plot: {
        fontSize: responsiveFontSize(15),
        marginVertical: 10
    },
    cast: {
        fontSize: responsiveFontSize(15),
        color: colors.whiteGrey,
        fontWeight: "600"
    },
    creator: {
        fontSize: responsiveFontSize(15),
        color: colors.whiteGrey,
        fontWeight: "600"
    },
    actionButtonContainer: {
        flexDirection: 'row',
        marginVertical: 15,
    },
    actionButton: {
        width: width / 4,
        alignItems: 'center',
    },
    actionButtonText: {
        fontSize: responsiveFontSize(13),
        paddingVertical: 5
    },

})

export default DetailMode;