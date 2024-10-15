import { useState, forwardRef, useImperativeHandle } from 'react';
import { View, ScrollView, Pressable, StyleSheet, Dimensions, LayoutChangeEvent } from "react-native"
import localization from "@/source/lib/locales/localization"
import colors from "@/source/theme/colors"
import responsiveFontSize from "@/source/theme/responsiveFontSize"
import { Ionicons, MaterialIcons, Octicons, Feather } from "@expo/vector-icons"
import VideoPlayer from '../VideoPlayer';
import { Portal } from "react-native-portalize"
import EpisodeList from "../EpisodeList"
import SimilarContentList from "../SimilarContentList"
import RedBarAnimation from "./redBarAnimation"
import { Text } from "../../Atoms"
import Constant from 'expo-constants';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';

type DetailModeProps = {
    content: Series | Movie
    categories: Category[]
}

export type DetailModeRef = {
    openAnimation: () => void;
}

const { width, height } = Dimensions.get("window");
const { statusBarHeight } = Constant;

const DetailMode = forwardRef(({ content, categories }: DetailModeProps, ref) => {

    useImperativeHandle(ref, () => ({
        openAnimation
    }));

    const [visible, setVisible] = useState<boolean>(false);
    const [similarOrEpisodesSelected, setSimilarOrEpisodesSelected] = useState<"similar" | "episodes">(content.type === "series" ? "episodes" : "similar");
    const [fullscreen, setFullscreen] = useState(false);

    const containerHeight = useSharedValue(0);
    const containerWidth = useSharedValue(0);
    const containerStyle = useAnimatedStyle(() => {
        return {
            height: containerHeight.value,
            width: containerWidth.value
        }
    });

    const [listAdded, setListAdded] = useState<boolean>(false);
    const [similarButtonWidth, setSimilarButtonWidth] = useState<number>(0);
    const [episodesButtonWidth, setEpisodesButtonWidth] = useState<number>(0);

    const findCategoryByContentId = (contentId: string) => {
        return categories.find((category) => category.contents.find((item) => item.id === contentId))?.contents || [];
    }
    const similarContent: (Series | Movie)[] = findCategoryByContentId(content.id);

    const similarButtonOnLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setSimilarButtonWidth(width);
    }

    const episodesButtonOnLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setEpisodesButtonWidth(width);
    }

    const closeDetailMode = () => {
        closeAnimation();
    }

    const openAnimation = () => {
        setVisible(true);
        containerHeight.value = withTiming(height, { duration: 1000 });
        containerWidth.value = withTiming(width, { duration: 1000 });
    }

    const closeAnimation = () => {
        setVisible(false);
    }

    if (!visible) return;

    return (
        <Portal>
            <Animated.View style={[styles.detailModeContainer, containerStyle]}>
                <Ionicons name="close" size={responsiveFontSize(24)} color={colors.white} onPress={closeDetailMode} style={styles.closeIcon} />
                <VideoPlayer
                    fullscreen={fullscreen}
                    videoSource={content.trailer}
                    visible={true}
                    style={styles.video}
                />
                <ScrollView style={styles.detailModeInformationContainer} contentContainerStyle={styles.detailModeInformationContainerContent} showsVerticalScrollIndicator={false}>
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
                    <Text text={`Cast : ${content.cast}`} style={styles.cast} />
                    <Text text={`Creator : ${content.creator}`} style={styles.creator} />
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
                    <View style={styles.similarAndEpisodesContainer}>
                        {content.type === "series" &&
                            <Pressable style={[styles.similarAndEpisodesButton, styles.episodesButton]} onLayout={episodesButtonOnLayout} onPress={() => setSimilarOrEpisodesSelected("episodes")}>
                                <RedBarAnimation isSelected={similarOrEpisodesSelected === "episodes"} width={episodesButtonWidth} />
                                <Text text={localization.t("episodes")} />
                            </Pressable>
                        }
                        <Pressable style={[styles.similarAndEpisodesButton, styles.similarButton]} onLayout={similarButtonOnLayout} onPress={() => setSimilarOrEpisodesSelected("similar")}>
                            <RedBarAnimation isSelected={similarOrEpisodesSelected === "similar"} width={similarButtonWidth} />
                            <Text text={localization.t("similar")} />
                        </Pressable>
                    </View>
                    {content.type === "series" && similarOrEpisodesSelected === "episodes" ? <EpisodeList seasons={content.seasons} /> : <SimilarContentList similarContent={similarContent} />}
                </ScrollView>
            </Animated.View>
        </Portal>
    )
})

const styles = StyleSheet.create({
    detailModeContainer: {
        position: "absolute",
        left: 0,
        top: statusBarHeight,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    video: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    detailModeInformationContainer: {
        backgroundColor: colors.darkGrey,
        padding: 10,
    },
    detailModeInformationContainerContent: {
        flexGrow: 1,
        paddingBottom: statusBarHeight * 2
    },
    closeIcon: {
        position: "absolute",
        right: 10,
        top: 10,
        zIndex: 1
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
    similarAndEpisodesContainer: {
        flexDirection: 'row',
    },
    similarAndEpisodesButton: {
    },
    similarButton: {

    },
    episodesButton: {
        marginRight: 20
    }
})

export default DetailMode;