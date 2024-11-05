import { useRef } from 'react';
import { StyleSheet } from "react-native";
import NewAndPopularTopList, { NewAndPopulatTopListRef } from "../../Molecules/NewAndPopularTopList";
import NewAndPopularMainList from "../../Molecules/NewAndPopularMainList";
import { FlashList } from '@shopify/flash-list';

type NewAndPopularListProps = {
    categories: Category[]
}

const NewAndPopularList = ({ categories }: NewAndPopularListProps) => {
    const topListRef = useRef<NewAndPopulatTopListRef>(null);
    const mainListRef = useRef(null);

    const categoryListRef = useRef<FlashList<Category>>(null);
    const contentListRef = useRef<FlashList<Series | Movie>>(null);

    const animationDuration: number = 100;

    return (
        <>
            <NewAndPopularTopList ref={topListRef} categoryListRef={categoryListRef} contentListRef={contentListRef} data={categories} animationDuration={animationDuration} />
            <NewAndPopularMainList ref={mainListRef} contentListRef={contentListRef} categoryListRef={categoryListRef} topListRef={topListRef} data={categories} animationDuration={animationDuration} />
        </>
    )
}

const styles = StyleSheet.create({

});

export default NewAndPopularList;