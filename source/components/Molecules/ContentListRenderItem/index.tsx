import { useRef } from 'react';
import categoryStore from '@/source/store/categoryStore';
import DetailMode, { DetailModeRef } from './detailMode';
import PosterMode from './posterMode';

type ContentListRenderItemProps = {
    content: Series | Movie,
    index: number
}



const ContentListRenderItem = ({ content, index }: ContentListRenderItemProps) => {
    const detailModeRef = useRef<DetailModeRef>(null);
    const categories = categoryStore((state) => state.categories);

    return (
        <>
            <PosterMode content={content} index={index} />
            <DetailMode ref={detailModeRef} categories={categories} content={content} />
        </>
    )
}

export default ContentListRenderItem;