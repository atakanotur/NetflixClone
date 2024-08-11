import { ComponentType, ReactElement } from "react";
import { FlashList, ListRenderItem, } from "@shopify/flash-list";
import { Insets, NativeScrollEvent, NativeSyntheticEvent, PointProp } from "react-native";

type CategoryListProps = {
    data: Category[];
    renderItem: ListRenderItem<Category>
    ListHeaderComponent?: ComponentType<any> | ReactElement<any, string | React.JSXElementConstructor<any>>
    onScroll?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
    onScrollAnimationEnd?: (() => void)
    onScrollBeginDrag?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
    onScrollEndDrag?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
    onScrollToTop?: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void)
    contentOffset?: PointProp
    contentInset?: Insets
    snapToOffsets?: number[]
}

const CategoryList = ({ data, renderItem, ListHeaderComponent, onScroll, onScrollAnimationEnd, onScrollBeginDrag, onScrollEndDrag, onScrollToTop, contentOffset, contentInset, snapToOffsets }: CategoryListProps) => {
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
            contentOffset={contentOffset}
            contentInset={contentInset}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}

        />
    )
}

export default CategoryList;