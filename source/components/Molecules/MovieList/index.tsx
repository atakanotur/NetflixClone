import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { LegacyRef } from "react";

type MovieListProps = {
    ref?: LegacyRef<FlashList<Series | Movie>>;
    data: (Series | Movie)[];
    renderItem: ListRenderItem<Series | Movie>
}

const MovieList = ({ ref, data, renderItem }: MovieListProps) => {
    return (
        <FlashList
            ref={ref}
            data={data}
            renderItem={renderItem}
            estimatedItemSize={300}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    )
}

export default MovieList;