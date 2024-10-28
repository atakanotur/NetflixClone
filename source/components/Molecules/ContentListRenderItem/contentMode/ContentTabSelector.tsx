import { useCallback, useState } from "react";
import { View, StyleSheet, Pressable, LayoutChangeEvent } from "react-native";
import { Text } from "@/source/components/Atoms";
import colors from "@/source/theme/colors";
import Animated, { SharedValue, useSharedValue, withTiming } from "react-native-reanimated";
import localization from "@/source/lib/locales/localization";
import EpisodeList from "../../EpisodeList";
import SimilarContentList from "../../SimilarContentList";
import categoryStore from "@/source/store/categoryStore";


type RedBarAnimationProps = {
    content: Series | Movie
}

const ContentTabSelector = ({ content }: RedBarAnimationProps) => {
    const categories = categoryStore(state => state.categories);

    const [similarOrEpisodesSelected, setSimilarOrEpisodesSelected] = useState<"similar" | "episodes">(content.type === "series" ? "episodes" : "similar");

    const [similarButtonWidth, setSimilarButtonWidth] = useState<number>(0);
    const [episodesButtonWidth, setEpisodesButtonWidth] = useState<number>(0);

    const similarContentRedBarWidth = useSharedValue(0);
    const episodesRedBarWidth = useSharedValue(0);

    const onSimilarButtonLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setSimilarButtonWidth(width);
        setInitialRedBarWidth(width);
    }

    const onEpisodesButtonLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setEpisodesButtonWidth(width);
        setInitialRedBarWidth(width);
    }

    const setInitialRedBarWidth = (width: number) => {
        if (content.type === "movie") return similarContentRedBarWidth.value = width;
        episodesRedBarWidth.value = width;
    }

    const getCategoryByContentId = (contentId: string) => {
        return categories.find((category) => category.contents.find((item) => item.id === contentId))?.contents || [];
    }
    const similarContent: (Series | Movie)[] = getCategoryByContentId(content.id);

    const handleSimilarContent = useCallback(() => {
        setSimilarOrEpisodesSelected("similar");
        redBarAnimations(similarButtonWidth, 0);
    }, [similarButtonWidth])

    const handleEpisodes = useCallback(() => {
        setSimilarOrEpisodesSelected("episodes");
        redBarAnimations(0, episodesButtonWidth);
    }, [episodesButtonWidth])

    const redBarAnimations = (similarWidth: number, episodesWidth: number) => {
        similarContentRedBarWidth.value = withTiming(similarWidth);
        episodesRedBarWidth.value = withTiming(episodesWidth);
    }

    const RedBar = ({ width }: { width: SharedValue<number> }) => {
        return <Animated.View style={[styles.redBarcontainer, { width }]} />
    }

    const SimilarContentRedBar = () => {
        return <RedBar width={similarContentRedBarWidth} />
    }

    const EpisodesRedBar = () => {
        return <RedBar width={episodesRedBarWidth} />
    }

    return (
        <>
            <View style={styles.similarAndEpisodesContainer}>
                {content.type === "series" &&
                    <Pressable onPress={handleEpisodes} style={styles.episodesButton} onLayout={onEpisodesButtonLayout}>
                        <EpisodesRedBar />
                        <Text text={localization.t("episodes")} />
                    </Pressable>
                }
                <Pressable onPress={handleSimilarContent} style={styles.similarButton} onLayout={onSimilarButtonLayout}>
                    <SimilarContentRedBar />
                    <Text text={localization.t("similar")} />
                </Pressable>
            </View>
            {content.type === "series" && similarOrEpisodesSelected === "episodes" ? <EpisodeList seasons={content.seasons} /> : <SimilarContentList similarContent={similarContent} />}
        </>
    )
}

const styles = StyleSheet.create({
    similarAndEpisodesContainer: {
        flexDirection: 'row'
    },
    redBarcontainer: {
        backgroundColor: colors.red,
        height: 5,
        marginBottom: 10
    },
    similarButton: {

    },
    episodesButton: {
        marginRight: 20
    }
})

export default ContentTabSelector;