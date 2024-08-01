import { ComponentType, ReactElement } from "react";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

type CategoryListProps = {
    data: Category[];
    renderItem: ListRenderItem<Category>
    ListHeaderComponent?: ComponentType<any> | ReactElement<any, string | React.JSXElementConstructor<any>>
    onScroll?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | undefined
    onScrollAnimationEnd?: (() => void) | undefined;
    onScrollBeginDrag?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | undefined
    onScrollEndDrag?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | undefined
    onScrollToTop?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | undefined
}

const CategoryList = ({ data, renderItem, ListHeaderComponent, onScroll, onScrollAnimationEnd, onScrollBeginDrag, onScrollEndDrag, onScrollToTop }: CategoryListProps) => {
    return (
        <FlashList
            data={data}
            renderItem={renderItem}
            ListHeaderComponent={ListHeaderComponent}
            estimatedItemSize={300}
            onScroll={onScroll}
            onScrollAnimationEnd={onScrollAnimationEnd}
            onScrollBeginDrag={onScrollBeginDrag}
            onScrollEndDrag={onScrollEndDrag}
            onScrollToTop={onScrollToTop}
        />
    )
}

export default CategoryList;