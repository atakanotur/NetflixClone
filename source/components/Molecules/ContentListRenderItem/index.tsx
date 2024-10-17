import PosterMode from './posterMode';

type ContentListRenderItemProps = {
    content: Series | Movie,
}

const ContentListRenderItem = ({ content }: ContentListRenderItemProps) => {
    return <PosterMode content={content} />;
}

export default ContentListRenderItem;