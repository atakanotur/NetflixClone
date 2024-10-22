import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { LegacyRef } from "react";

type ContentListProps = {
    ref?: LegacyRef<FlashList<Series | Movie>>;
    data: (Series | Movie)[];
    renderItem: ListRenderItem<Series | Movie>
}

const ContentList = ({ ref, data, renderItem }: ContentListProps) => {
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

export default ContentList;