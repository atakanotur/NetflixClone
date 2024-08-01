import { ComponentType, ReactElement } from "react";
import { FlashList, ListRenderItem } from "@shopify/flash-list";

type CategoryListProps = {
    data: Category[];
    renderItem: ListRenderItem<Category>
    ListHeaderComponent?: ComponentType<any> | ReactElement<any, string | React.JSXElementConstructor<any>>
}

const CategoryList = ({ data, renderItem, ListHeaderComponent }: CategoryListProps) => {
    return (
        <FlashList
            data={data}
            renderItem={renderItem}
            ListHeaderComponent={ListHeaderComponent}
            estimatedItemSize={300}
        />
    )
}

export default CategoryList;