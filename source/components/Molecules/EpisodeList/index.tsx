import { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Text } from "../../Atoms";
import responsiveFontSize from "@/source/theme/responsiveFontSize";
import colors from "@/source/theme/colors";
import { router } from "expo-router";
import { Ionicons, Octicons } from "@expo/vector-icons";

type EpisodeListProps = {
    seasons: Season[];
}

const EpisodeList = ({ seasons }: EpisodeListProps) => {
    const [episodes, setEpisodes] = useState<Episode[]>(seasons[0].episodes);

    const EpisodeListRenderItem = ({ item, index }: { item: Episode, index: number }) => {
        return (
            <View style={styles.episodeContainer}>
                <View style={styles.bannerContainer}>
                    <View style={styles.thumbnailContainer}>
                        <ImageBackground source={{ uri: item.poster }} style={styles.thumbnail} imageStyle={styles.thumbnailImage} resizeMode="cover">
                            <View style={styles.playButtonContainer}>
                                <Ionicons name="play" size={responsiveFontSize(20)} color={colors.white} style={styles.playButton} />
                            </View>
                        </ImageBackground>
                        <View style={styles.titleContainer}>
                            <Text text={`${index + 1}. ${item.title}`} style={styles.titleText} />
                            <Text text={item.duration} style={styles.durationText} />
                        </View>
                    </View>
                    <View style={styles.downloadContainer}>
                        <Octicons name="download" size={responsiveFontSize(23)} color={colors.white} style={styles.downloadIcon} onPress={() => router.push({ pathname: "/downloads" })} />
                    </View>
                </View>
                <View style={styles.plotContainer}>
                    <Text text={item.plot} style={styles.plotText} />
                </View>
            </View>
        )
    }

    return (
        <FlashList
            keyExtractor={(item) => item.id}
            data={episodes}
            renderItem={({ item, index }) => EpisodeListRenderItem({ item, index })}
            estimatedItemSize={100}
            scrollEnabled={false}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    episodeContainer: {
        paddingVertical: 10,
    },
    bannerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    thumbnailContainer: {
        flexDirection: "row",
    },
    thumbnail: {
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    thumbnailImage: {
        borderRadius: 5,
    },
    playButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        borderWidth: 1,
        borderColor: colors.whiteGrey,
        padding: 2,
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    playButton: {
    },
    titleContainer: {
        padding: 10,
    },
    titleText: {
        fontSize: responsiveFontSize(16),
        color: colors.white,
        fontWeight: "bold"
    },
    durationText: {
        fontSize: responsiveFontSize(14),
        color: colors.whiteGrey
    },
    downloadContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    plotContainer: {

    },
    plotText: {
        fontSize: responsiveFontSize(14),
        color: colors.whiteGrey
    },
    downloadIcon: {
        color: colors.white,
        alignSelf: "center",
    }
})

export default EpisodeList;