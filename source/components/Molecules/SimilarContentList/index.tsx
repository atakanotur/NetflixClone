import { FlashList } from "@shopify/flash-list";
import { View, StyleSheet } from "react-native";
import ContentListRenderItem from "../ContentListRenderItem";

type SimilarContentListProps = {
    similarContent: (Series | Movie)[];
}

const SimilarContentList = ({ similarContent }: SimilarContentListProps) => {

    return (
        <FlashList
            data={similarContent}
            renderItem={({ item }) => <ContentListRenderItem content={item} />}
            estimatedItemSize={100}
            numColumns={3}
            scrollEnabled={false}
        />
    )
}

const styles = StyleSheet.create({

})

export default SimilarContentList;