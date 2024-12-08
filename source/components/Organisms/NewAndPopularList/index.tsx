import { useRef } from 'react';
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
    const contentListRef = useRef<FlashList<ContentWithCategory>>(null);

    const animationDuration: number = 100;

    return (
        <>
            <NewAndPopularTopList ref={topListRef} categoryListRef={categoryListRef} contentListRef={contentListRef} data={categories} animationDuration={animationDuration} />
            <NewAndPopularMainList ref={mainListRef} contentListRef={contentListRef} topListRef={topListRef} data={categories} />
        </>
    )
}

export default NewAndPopularList;