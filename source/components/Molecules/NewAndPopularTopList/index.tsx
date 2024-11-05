import { MutableRefObject, RefObject, forwardRef, useImperativeHandle, useRef, useState, createRef } from "react";
import { View, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import NewAndPopularTopListRenderItem from "./NewAndPopularTopListRenderItem";
import SelectedCategoryAnimation, { SelectedCategoryAnimationRef } from "./SelectedCategoryAnimation";
import { captureViewDimensions, captureViewPosition } from "@/source/lib/captureViewPositions";

type NewAndPopularTopListProps = {
    categoryListRef: RefObject<FlashList<Category>>
    contentListRef: RefObject<FlashList<Series | Movie>>
    data: Category[],
    animationDuration: number
}

export type NewAndPopulatTopListRef = {
    selectCategoryWithoutMoveContentIndicator: (index: number) => void;
}

const { width } = Dimensions.get("screen");

const NewAndPopularTopList = forwardRef(({ categoryListRef, contentListRef, data, animationDuration }: NewAndPopularTopListProps, ref) => {
    useImperativeHandle(ref, () => ({
        selectCategoryWithoutMoveContentIndicator
    }))

    const animationRef = useRef<SelectedCategoryAnimationRef>(null);
    const itemContainerRefs: MutableRefObject<View>[] = []

    const [selectedCategoryRef, setSelectedCategoryRef] = useState<MutableRefObject<View>>({} as MutableRefObject<View>);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
    const [selectedCategoryHeight, setSelectedCategoryHeight] = useState<number | null>(null);

    const [isScrolling, setIsScrolling] = useState<boolean>(true);

    const selectCategoryWithoutMoveContentIndicator = async (index: number) => {
        const ref = itemContainerRefs[index];
        setSelectedCategoryRef(ref);
        setSelectedCategoryIndex(index);

        scrollItemToCenter(index);
        moveCategoryIndicator(ref, index);
    }

    const selectCategory = async (index: number) => {
        const ref = itemContainerRefs[index];
        setSelectedCategoryRef(ref);
        setSelectedCategoryIndex(index);

        scrollItemToCenter(index);
        moveCategoryIndicator(ref, index);
        moveContentIndicator(index)
    }

    const scrollItemToCenter = (index: number) => {
        categoryListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5,
        });
    }

    const moveCategoryIndicator = async (ref: MutableRefObject<View>, index: number) => {
        const { width: itemWidth, height: itemHeight } = await captureViewDimensions(ref);
        setSelectedCategoryHeight(itemHeight);
        const pageX = calculatePageXOfSelectedItem(index, itemWidth)
        animationRef.current?.moveCategoryIndicator(pageX, itemWidth);
    }

    const moveContentIndicator = (index: number) => {
        contentListRef.current?.scrollToIndex({
            index: index * 10,
            animated: true,
            viewPosition: 0.5
        })
    }

    const calculatePageXOfSelectedItem = (index: number, itemWidth: number): number => {
        //3 because i give a margin 3 to renderItem
        if (index === 0) return 3
        if (index !== data.length - 1) return (width / 2) - (itemWidth / 2) + 3
        return width - 3 - itemWidth
    }

    const categoryListOnScroll = async () => {
        if (isScrolling) return;
        const { pageX } = await captureViewPosition(selectedCategoryRef);
        animationRef.current?.scrollCategoryIndicator(pageX);
    }

    const categoryListOnScrollBeginDrag = () => {
        setIsScrolling(false)
    }

    const categoryListOnMomentumScrollEnd = () => {
        setIsScrolling(true)
    }

    const renderItem = ({ item, index }: { item: Category, index: number }) => {
        const newRef: MutableRefObject<View> = createRef<MutableRefObject<View>>().current ?? {} as MutableRefObject<View>
        itemContainerRefs.push();

        return (
            <NewAndPopularTopListRenderItem
                containerRef={newRef}
                selectCategory={selectCategory}
                category={item}
                index={index}
                selected={index === selectedCategoryIndex}
            />
        );
    };


    return (
        <View>
            <FlashList
                ref={categoryListRef}
                data={data}
                renderItem={renderItem}
                extraData={selectedCategoryIndex}
                estimatedItemSize={5}
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
})

export default NewAndPopularTopList;
