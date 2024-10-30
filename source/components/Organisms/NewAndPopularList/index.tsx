import { StyleSheet } from "react-native";
import { FlashList, ListRenderItem } from "@shopify/flash-list";

type NewAndPopularListProps = {
    renderItem: ListRenderItem<unknown>
}

const NewAndPopularList = ({ renderItem }: NewAndPopularListProps) => {
    return (
        <FlashList
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({

});

export default NewAndPopularList;