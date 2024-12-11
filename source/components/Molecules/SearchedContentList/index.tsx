import { FlashList } from "@shopify/flash-list";
import { View, StyleSheet, Dimensions } from "react-native";
import ContentListRenderItem from "../ContentList/ContentListRenderItem";
import localization from "@/source/lib/locales/localization";
import { Text } from "../../Atoms";
import responsiveFontSize from "@/source/theme/responsiveFontSize";
import colors from "@/source/theme/colors";

type SearchedContentListProps = {
    contents: Content[]
}

const { width } = Dimensions.get("screen");
const posterWidth: number = width / 3.275;
const posterHeight: number = posterWidth * 1.4;

const SearchedContentList = ({ contents }: SearchedContentListProps) => {

    if (contents.length === 0) {
        return (
            <View style={styles.emptySearch}>
                <Text text={localization.t("weDontHaveThat")} style={styles.weDontHaveThat} />
                <Text text={localization.t("tryAnotherContent")} style={styles.tryAnotherContent} />
            </View>
        )
    }

    const searchedContentListRenderItem = ({ item, index }: { item: Content, index: number }) => {
        return <ContentListRenderItem content={item} />
    }

    return (
        <>
            <Text text={localization.t("bestResult")} style={styles.categoryName} />
            <FlashList
                data={contents}
                renderItem={searchedContentListRenderItem}
                extraData={contents}
                numColumns={3}
                estimatedItemSize={20}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: posterWidth,
        height: posterHeight,
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: 10
    },
    emptySearch: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    },
    weDontHaveThat: {
        color: colors.white,
        fontSize: responsiveFontSize(30),
        fontWeight: "800"
    },
    tryAnotherContent: {
        color: colors.whiteGrey,
        fontSize: responsiveFontSize(20),
        textAlign: "center"
    },
    categoryName: {
        fontWeight: "700",
        marginVertical: 10,
    }
})

export default SearchedContentList
