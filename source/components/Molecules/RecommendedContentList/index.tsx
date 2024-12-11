import { View, StyleSheet, Image } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { Text } from "../../Atoms"
import { Ionicons } from "@expo/vector-icons"
import responsiveFontSize from "@/source/theme/responsiveFontSize"
import colors from "@/source/theme/colors"
import localization from "@/source/lib/locales/localization"

type RecommendedListProps = {
    contents: Content[]
}

const RecommendedContentList = ({ contents }: RecommendedListProps) => {
    const recommendedListRenderItem = ({ item, index }: { item: Content, index: number }) => {
        return (
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image source={{ uri: item.poster }} resizeMode="stretch" style={styles.image} />
                </View>
                <View style={styles.nameAndPlay}>
                    <Text text={item.title} style={styles.name} />
                    <Ionicons name="play-circle-outline" size={responsiveFontSize(45)} color={colors.white} style={styles.play} />
                </View>
            </View>
        )
    }

    return (
        <>
            <Text text={localization.t("recommendedSeriesAndMovies")} style={styles.categoryName} />
            <FlashList
                data={contents}
                renderItem={recommendedListRenderItem}
                estimatedItemSize={50}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: "row"
    },
    image: {
        flex: 1,
        height: 65,
        borderRadius: 5
    },
    nameAndPlay: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10
    },
    name: {
        fontSize: responsiveFontSize(13),
        fontWeight: "700"
    },
    play: {
    },
    categoryName: {
        fontWeight: "700",
        marginVertical: 10,
    },
});

export default RecommendedContentList;