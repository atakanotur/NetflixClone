import { ComponentType, ReactElement } from "react";
import { ContentStyle, FlashList, ListRenderItem, } from "@shopify/flash-list";
import { Insets, NativeScrollEvent, NativeSyntheticEvent, PointProp } from "react-native";

type MainListProps = {
    data: Category[];
    extraData: any;
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
    contentContainerStyle?: ContentStyle
}

const MainList = ({ data, extraData, renderItem, ListHeaderComponent, onScroll, onScrollAnimationEnd, onScrollBeginDrag, onScrollEndDrag, onScrollToTop, contentOffset, contentInset, snapToOffsets, contentContainerStyle }: MainListProps) => {
    return (
        <FlashList
            data={data}
            extraData={extraData}
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
            snapToOffsets={snapToOffsets}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            contentContainerStyle={contentContainerStyle}
        />
    )
}

export default MainList;