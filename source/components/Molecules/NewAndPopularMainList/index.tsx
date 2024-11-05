import { useRef, forwardRef, RefObject } from "react";
import { FlashList, ViewToken } from "@shopify/flash-list";
import NewAndPopularMainListRenderItem from "./NewAndPopularMainListRenderItem";
import { NewAndPopulatTopListRef } from "../NewAndPopularTopList";

type NewAndPopularMainListProps = {
    contentListRef: RefObject<FlashList<Series | Movie>>;
    categoryListRef: RefObject<FlashList<Category>>;
    topListRef: RefObject<NewAndPopulatTopListRef>;
    data: Category[];
    animationDuration: number;
};

const NewAndPopularMainList = forwardRef(({ contentListRef, categoryListRef, data, animationDuration, topListRef }: NewAndPopularMainListProps, ref) => {
    const contents = data.flatMap(category => category.contents);
    console.log("contents", contents);

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
        if (viewableItems.length > 0) {
            const firstVisibleItem: number | null = viewableItems[0].index;
            console.log("firstVisibItem", firstVisibleItem);
            if (firstVisibleItem === 0) return moveCategoryListIndicator(0);
            if (firstVisibleItem === 10) return moveCategoryListIndicator(1);
            if (firstVisibleItem === 20) return moveCategoryListIndicator(2);
            if (firstVisibleItem === 30) return moveCategoryListIndicator(3);
        }
    }).current;

    const moveCategoryListIndicator = (index: number) => topListRef.current?.selectCategoryWithoutMoveContentIndicator(index);

    return (
        <FlashList
            ref={contentListRef}
            data={contents}
            renderItem={({ item, index }: { item: Series | Movie, index: number }) => (
                <NewAndPopularMainListRenderItem content={item} index={index} />
            )}
            estimatedItemSize={100}
            onViewableItemsChanged={onViewableItemsChanged}
        />
    );
});

export default NewAndPopularMainList;
