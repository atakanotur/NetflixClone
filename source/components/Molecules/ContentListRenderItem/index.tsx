import { useState } from 'react';
import { View, StyleSheet, Pressable, Image, Dimensions, LayoutChangeEvent } from 'react-native';
import { Portal } from 'react-native-portalize';
import VideoPlayer from '../VideoPlayer';
import colors from '@/source/theme/colors';
import { MaterialIcons, Ionicons, Octicons, Feather } from '@expo/vector-icons';
import Constant from 'expo-constants'
import { Text } from '../../Atoms';
import localization from '@/source/lib/locales/localization';
import responsiveFontSize from '@/source/theme/responsiveFontSize';
import EpisodeList from '../EpisodeList';
import SimilarContentList from '../SimilarContentList';
import RedBarAnimation from './redBarAnimation';

type ContentListRenderItemProps = {
    content: Series | Movie,
}

const { width, height } = Dimensions.get('window');
const { statusBarHeight } = Constant;

const ContentListRenderItem = ({ content }: ContentListRenderItemProps) => {
    const [detailMode, setDetailMode] = useState<boolean>(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [videoPlayerVisible, setVideoPlayerVisible] = useState<boolean>(false);
    const [similarButtonWidth, setSimilarButtonWidth] = useState<number>(0);
    const [episodesButtonWidth, setEpisodesButtonWidth] = useState<number>(0);
    const [similarOrEpisodesSelected, setSimilarOrEpisodesSelected] = useState<"similar" | "episodes">("similar");

    const [listAdded, setListAdded] = useState<boolean>(false);
    const contentOnPress = () => {
        setDetailMode(true);
        setVideoPlayerVisible(true);
    }

    const similarButtonOnLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setSimilarButtonWidth(width);
    }

    const episodesButtonOnLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setEpisodesButtonWidth(width);
    }

    if (detailMode) {
        return (
            <Portal>
                <View style={styles.detailModeContainer}>
                    <Ionicons name="close" size={responsiveFontSize(24)} color={colors.white} onPress={() => setDetailMode(false)} style={styles.closeIcon} />
                    <VideoPlayer
                        fullscreen={fullscreen}
                        videoSource={content.trailer}
                        visible={videoPlayerVisible}
                        style={styles.video}
                    />
                    <View style={styles.detailModeInformationContainer}>
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
                            <Pressable style={[styles.similarAndEpisodesButton, styles.similarButton]} onLayout={similarButtonOnLayout} onPress={() => setSimilarOrEpisodesSelected("similar")}>
                                <RedBarAnimation isSelected={similarOrEpisodesSelected === "similar"} width={similarButtonWidth} />
                                <Text text={localization.t("similar")} />
                            </Pressable>
                            <Pressable style={[styles.similarAndEpisodesButton, styles.episodesButton]} onLayout={episodesButtonOnLayout} onPress={() => setSimilarOrEpisodesSelected("episodes")}>
                                <RedBarAnimation isSelected={similarOrEpisodesSelected === "episodes"} width={episodesButtonWidth} />
                                <Text text={localization.t("episodes")} />
                            </Pressable>
                        </View>
                        {content.type === "series" ??
                            <EpisodeList />
                        }
                        <SimilarContentList />
                    </View>
                </View>
            </Portal>
        )
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={contentOnPress}>
                <Image source={{ uri: content.poster }} style={styles.poster} resizeMode="stretch" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: (width / 3.275) * 1.3,
        width: width / 3.275,
        margin: 5
    },
    poster: {
        height: (width / 3.275) * 1.3,
        width: width / 3.275,
        borderRadius: 5,
    },
    detailModeContainer: {
        position: "absolute",
        left: 0,
        top: statusBarHeight,
        height,
        width,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingTop: 0
    },
    video: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    detailModeInformationContainer: {
        flex: 1,
        backgroundColor: colors.darkGrey,
        padding: 10,
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
        color: colors.grey,
        fontWeight: "600"
    },
    creator: {
        fontSize: responsiveFontSize(15),
        color: colors.grey,
        fontWeight: "600"
    },
    actionButtonContainer: {
        flexDirection: 'row',
        marginVertical: 15
    },
    actionButton: {
        width: width / 4,
        height: width / 4,
        alignItems: 'center'
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
        marginHorizontal: 20
    }
});

export default ContentListRenderItem;