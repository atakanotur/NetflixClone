import { useState, forwardRef, useImperativeHandle } from 'react';
import { View, ScrollView, Pressable, StyleSheet, Dimensions, LayoutChangeEvent } from "react-native"
import localization from "@/source/lib/locales/localization"
import colors from "@/source/theme/colors"
import responsiveFontSize from "@/source/theme/responsiveFontSize"
import { Ionicons, MaterialIcons, Octicons, Feather } from "@expo/vector-icons"
import VideoPlayer from '../VideoPlayer';
import EpisodeList from "../EpisodeList"
import SimilarContentList from "../SimilarContentList"
import RedBarAnimation from "./redBarAnimation"
import { Text } from "../../Atoms"
import Constant from 'expo-constants';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import categoryStore from '@/source/store/categoryStore';
import { BlurView } from 'expo-blur';

type DetailModeProps = {
    content: Series | Movie;
    onClose: () => void;
    collapsibleWidth: number;
    collapsibleHeight: number;
    animationDuration: number;
}

export type DetailModeRef = {
    animateOpen: () => void;
    animateClose: () => void;
}

const { width, height } = Dimensions.get("window");
const { statusBarHeight } = Constant;

const DetailMode = forwardRef(({ content, onClose, collapsibleWidth, collapsibleHeight, animationDuration }: DetailModeProps, ref) => {
    useImperativeHandle(ref, () => ({
        animateOpen,
        animateClose
    }));

    const categories = categoryStore(state => state.categories);

    const [expanded, setExpanded] = useState<boolean>(false);
    const [similarOrEpisodesSelected, setSimilarOrEpisodesSelected] = useState<"similar" | "episodes">(content.type === "series" ? "episodes" : "similar");
    const [fullscreen, setFullscreen] = useState<boolean>(false);

    const [listAdded, setListAdded] = useState<boolean>(false);
    const [similarButtonWidth, setSimilarButtonWidth] = useState<number>(0);
    const [episodesButtonWidth, setEpisodesButtonWidth] = useState<number>(0);

    const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

    // Container Animation
    const detailPaddingTop = useSharedValue(statusBarHeight);
    const detailHeight = useSharedValue(0);
    const detailWidth = useSharedValue(0);
    const detailZIndex = useSharedValue(0);
    const detailStyle = useAnimatedStyle(() => {
        return {
            paddingTop: detailPaddingTop.value,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            height: detailHeight.value,
            width: detailWidth.value + 1,
            zIndex: detailZIndex.value,
        }
    });

    //DetailBlurView Animation
    const detailBlurViewHeight = useSharedValue(collapsibleHeight);
    const detailBlurViewWidth = useSharedValue(collapsibleWidth);
    const detailBlurViewZIndex = useSharedValue(0)
    const detailBlurIntensity = useSharedValue(200);
    const detailBlurViewStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            height: detailBlurViewHeight.value,
            width: detailBlurViewWidth.value,
            zIndex: detailBlurViewZIndex.value,
        }
    })

    // Poster Animation
    const posterHeight = useSharedValue(collapsibleHeight);
    const posterWidth = useSharedValue(collapsibleWidth);
    const posterZIndex = useSharedValue(2);
    const posterStyle = useAnimatedStyle(() => {
        return {
            position: "absolute",
            height: posterHeight.value,
            width: posterWidth.value,
            zIndex: posterZIndex.value,
        }
    });

    //PosterBlurView Animation
    const posterBlurViewHeight = useSharedValue(collapsibleHeight);
    const posterBlurViewWidth = useSharedValue(collapsibleWidth);
    const posterBlurViewZIndex = useSharedValue(3)
    const posterBlurIntensity = useSharedValue(0);
    const posterBlurViewStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            height: posterBlurViewHeight.value,
            width: posterBlurViewWidth.value,
            zIndex: posterBlurViewZIndex.value,
        }
    })


    const animateOpen = () => {
        setExpanded(true);

        detailPaddingTop.value = withTiming(0, { duration: animationDuration });
        detailHeight.value = withTiming(height, { duration: animationDuration });
        detailWidth.value = withTiming(width, { duration: animationDuration });
        detailZIndex.value = withTiming(3, { duration: animationDuration });

        detailBlurViewHeight.value = withTiming(height, { duration: animationDuration });
        detailBlurViewWidth.value = withTiming(width, { duration: animationDuration });
        detailBlurViewZIndex.value = withTiming(2, { duration: animationDuration / 2 });
        detailBlurIntensity.value = withTiming(0, { duration: animationDuration });

        posterHeight.value = withTiming(height, { duration: animationDuration });
        posterWidth.value = withTiming(width, { duration: animationDuration });
        posterZIndex.value = withTiming(0, { duration: animationDuration });

        posterBlurViewHeight.value = withTiming(height, { duration: animationDuration });
        posterBlurViewWidth.value = withTiming(width, { duration: animationDuration });
        posterBlurViewZIndex.value = withTiming(0, { duration: animationDuration });
        posterBlurIntensity.value = withTiming(100, { duration: animationDuration });
    }

    const animateClose = () => {
        onClose();
        setTimeout(() => {
            setExpanded(false);
        }, animationDuration / 2);

        detailPaddingTop.value = withTiming(0, { duration: animationDuration });
        detailHeight.value = withTiming(collapsibleHeight, { duration: animationDuration });
        detailWidth.value = withTiming(collapsibleWidth, { duration: animationDuration });
        detailZIndex.value = withTiming(0, { duration: animationDuration });

        detailBlurViewHeight.value = withTiming(0, { duration: animationDuration });
        detailBlurViewWidth.value = withTiming(collapsibleHeight, { duration: animationDuration });
        detailBlurViewZIndex.value = withTiming(collapsibleWidth, { duration: animationDuration });
        detailBlurIntensity.value = withTiming(100, { duration: animationDuration });

        posterHeight.value = withTiming(collapsibleHeight, { duration: animationDuration });
        posterWidth.value = withTiming(collapsibleWidth, { duration: animationDuration });
        posterZIndex.value = withTiming(3, { duration: animationDuration });

        posterBlurViewHeight.value = withTiming(collapsibleHeight, { duration: animationDuration });
        posterBlurViewWidth.value = withTiming(collapsibleWidth, { duration: animationDuration });
        posterBlurViewZIndex.value = withTiming(4, { duration: animationDuration / 2 });
        posterBlurIntensity.value = withTiming(0, { duration: animationDuration });
    }

    const getCategoryByContentId = (contentId: string) => {
        return categories.find((category) => category.contents.find((item) => item.id === contentId))?.contents || [];
    }
    const similarContent: (Series | Movie)[] = getCategoryByContentId(content.id);

    const onSimilarButtonLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setSimilarButtonWidth(width);
    }

    const onEpisodesButtonLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setEpisodesButtonWidth(width);
    }

    return (
        <Animated.View style={detailStyle}>
            <AnimatedBlurView style={[posterBlurViewStyle]} intensity={posterBlurIntensity} />
            <Animated.Image source={{ uri: content.poster }} style={posterStyle} />
            <AnimatedBlurView style={[detailBlurViewStyle]} intensity={detailBlurIntensity} />
            {expanded &&
                <>
                    <Ionicons name="close" size={responsiveFontSize(24)} color={colors.white} onPress={animateClose} style={styles.closeIcon} /><VideoPlayer
                        fullscreen={fullscreen}
                        videoSource={content.trailer}
                        visible={true}
                        style={styles.video} /><ScrollView style={styles.detailModeInformationContainer} contentContainerStyle={styles.detailModeInformationContainerContent} showsVerticalScrollIndicator={false}>
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
                                <Pressable style={[styles.similarAndEpisodesButton, styles.episodesButton]} onLayout={onEpisodesButtonLayout} onPress={() => setSimilarOrEpisodesSelected("episodes")}>
                                    <RedBarAnimation isSelected={similarOrEpisodesSelected === "episodes"} width={episodesButtonWidth} />
                                    <Text text={localization.t("episodes")} />
                                </Pressable>}
                            <Pressable style={[styles.similarAndEpisodesButton, styles.similarButton]} onLayout={onSimilarButtonLayout} onPress={() => setSimilarOrEpisodesSelected("similar")}>
                                <RedBarAnimation isSelected={similarOrEpisodesSelected === "similar"} width={similarButtonWidth} />
                                <Text text={localization.t("similar")} />
                            </Pressable>
                        </View>
                        {content.type === "series" && similarOrEpisodesSelected === "episodes" ? <EpisodeList seasons={content.seasons} /> : <SimilarContentList similarContent={similarContent} />}
                    </ScrollView>
                </>
            }
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    video: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    detailModeInformationContainer: {
        backgroundColor: colors.darkGrey,
        padding: 10,
        zIndex: 4
    },
    detailModeInformationContainerContent: {
        flexGrow: 1,
        paddingBottom: statusBarHeight * 2,
        zIndex: 4
    },
    closeIcon: {
        position: "absolute",
        right: 10,
        top: statusBarHeight + 10,
        zIndex: 2
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