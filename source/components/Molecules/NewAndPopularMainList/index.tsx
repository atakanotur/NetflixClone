import { useState, forwardRef, RefObject, useRef, createRef } from "react";
import { FlashList, ViewToken } from "@shopify/flash-list";
import NewAndPopularMainListRenderItem, { NewAndPopularRenderItemRef } from "./NewAndPopularMainListRenderItem";
import { NewAndPopulatTopListRef } from "../NewAndPopularTopList";

type NewAndPopularMainListProps = {
    contentListRef: RefObject<FlashList<ContentWithCategory>>;
    topListRef: RefObject<NewAndPopulatTopListRef>;
    data: Category[];
};

const NewAndPopularMainList = forwardRef(({ contentListRef, topListRef, data }: NewAndPopularMainListProps, ref) => {
    const contents: ContentWithCategory[] = data.flatMap(category => category.contents.flatMap(content => ({ ...content, categoryId: category.id })));
    const contentRefs = useRef(data.map(() => createRef<NewAndPopularRenderItemRef>()));
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

    let currentCategoryIndex: number = 0;
    const onViewableItemsChanged = async ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        const viewableItemIndex: number = viewableItems[0].index ? viewableItems[0].index : 0;
        const viewableItemCategoryIndex = getCategoryTopItemId(viewableItemIndex);
        setSelectedCategoryId(viewableItemCategoryIndex);
        moveCategoryListIndicator(viewableItemCategoryIndex);
    };

    const getCategoryTopItemId = (index: number): number => {
        return data.findIndex(category => category.contents.some(content => content.id === contents[index].id));
    }

    const moveCategoryListIndicator = (index: number) => {
        currentCategoryIndex = index;
        topListRef.current?.selectCategoryWithoutContentIndicator(index);
    }

    const indexOfItemInCategory = (contentId: string): number => {
        if (data[2].contents.some((content) => content.id === contentId)) {
            return data[2].contents.findIndex((content) => content.id === contentId)
        }
        return data[3].contents.findIndex((content) => content.id === contentId)
    }

    return (
        <FlashList
            ref={contentListRef}
            data={contents}
            renderItem={({ item, index }: { item: ContentWithCategory, index: number }) => {
                const ref = createRef<NewAndPopularRenderItemRef>();
                contentRefs.current[index] = ref;
                return (
                    <NewAndPopularMainListRenderItem
                        ref={ref}
                        content={item}
                        indexOfItemInCategory={indexOfItemInCategory(item.id)} />
                )
            }}
            extraData={selectedCategoryId}
            estimatedItemSize={50}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
                viewAreaCoveragePercentThreshold: 100,
            }}
        />
    );
});

export default NewAndPopularMainList;
