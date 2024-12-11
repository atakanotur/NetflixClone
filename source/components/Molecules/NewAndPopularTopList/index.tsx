import { RefObject, createRef, forwardRef, useImperativeHandle, useRef, useState } from "react";
import { View, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import NewAndPopularTopListRenderItem from "./NewAndPopularTopListRenderItem";
import SelectedCategoryAnimation, { SelectedCategoryAnimationRef } from "./SelectedCategoryAnimation";
import { captureViewDimensions, captureViewPosition } from "@/source/lib/captureViewPositions";

type NewAndPopularTopListProps = {
    categoryListRef: RefObject<FlashList<Category>>;
    contentListRef: RefObject<FlashList<ContentWithCategory>>;
    data: Category[];
    animationDuration: number;
};

export type NewAndPopulatTopListRef = {
    selectCategoryWithoutContentIndicator: (index: number) => void;
};

const { width } = Dimensions.get("screen");

const NewAndPopularTopList = forwardRef(({ categoryListRef, contentListRef, data, animationDuration }: NewAndPopularTopListProps, ref) => {
    useImperativeHandle(ref, () => ({
        selectCategoryWithoutContentIndicator
    }));

    const itemContainerRefs = useRef(data.map(() => createRef<View>()));
    const animationRef = useRef<SelectedCategoryAnimationRef>(null);

    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(5);
    const [selectedCategoryHeight, setSelectedCategoryHeight] = useState<number>(0);
    const [isScrolling, setIsScrolling] = useState<boolean>(true);

    const handleSelectCategory = (index: number, shouldMoveContentIndicator: boolean) => {
        setSelectedCategoryIndex(index);
        scrollItemToCenter(index);
        moveCategoryIndicator(index);

        if (shouldMoveContentIndicator) moveContentIndicator(index);
    };

    const selectCategoryWithoutContentIndicator = (index: number) => {
        handleSelectCategory(index, false);
    };

    const selectCategoryWithContentIndicator = (index: number) => {
        handleSelectCategory(index, true);
    };

    const scrollItemToCenter = (index: number) => {
        categoryListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5
        });
    };

    const moveCategoryIndicator = async (index: number) => {
        const ref = itemContainerRefs.current[index];
        const { width, height } = await captureViewDimensions(ref)
        const pageX = calculatePageXOfSelectedItem(index, width);
        setSelectedCategoryHeight(height);
        await animationRef.current?.moveCategoryIndicator(pageX, width);
    };

    const moveContentIndicator = (index: number) => {
        const contentListIndex = findIndexContentList(index);
        contentListRef.current?.scrollToIndex({
            index: contentListIndex,
            animated: true,
            viewPosition: 0,
        });
    };

    const findIndexContentList = (categoryIndex: number): number => {
        let index: number = 0;
        for (let i = 1; i <= categoryIndex; i++) {
            index = index + data[categoryIndex].contents.length;
        }
        return index;
    }

    const calculatePageXOfSelectedItem = (index: number, itemWidth: number): number => {
        const renderItemMargin: number = 3;
        if (index === 0) return renderItemMargin;
        if (index !== data.length - 1) return (width / 2) - (itemWidth / 2);
        return width - renderItemMargin - itemWidth;
    };

    const categoryListOnScroll = async () => {
        if (isScrolling) return;
        const { pageX } = await captureViewPosition(itemContainerRefs.current[selectedCategoryIndex]);
        animationRef.current?.scrollCategoryIndicator(pageX);
    };

    const categoryListOnScrollBeginDrag = () => {
        setIsScrolling(false);
    };

    const categoryListOnMomentumScrollEnd = () => {
        setIsScrolling(true);
    };

    const renderItem = ({ item, index }: { item: Category; index: number }) => {
        const ref = createRef<View>();
        itemContainerRefs.current[index] = ref;
        return (
            <NewAndPopularTopListRenderItem
                ref={ref}
                selectCategory={selectCategoryWithContentIndicator}
                category={item}
                index={index}
                selected={index === selectedCategoryIndex}
            />
        );
    };

    return (
        <View>
            <FlashList
                keyExtractor={(item, index) => index.toString()}
                ref={categoryListRef}
                data={data}
                extraData={selectedCategoryIndex}
                renderItem={renderItem}
                estimatedItemSize={4}
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={categoryListOnScroll}
                onScrollBeginDrag={categoryListOnScrollBeginDrag}
                onMomentumScrollEnd={categoryListOnMomentumScrollEnd}
            />
            <SelectedCategoryAnimation
                ref={animationRef}
                animationDuration={animationDuration}
                height={selectedCategoryHeight}
            />
        </View>
    );
});

export default NewAndPopularTopList;