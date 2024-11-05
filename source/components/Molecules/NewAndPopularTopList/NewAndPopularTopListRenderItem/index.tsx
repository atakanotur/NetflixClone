import { MutableRefObject, forwardRef, useRef } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { Text } from "@/source/components/Atoms";
import colors from "@/source/theme/colors";
import responsiveFontSize from "@/source/theme/responsiveFontSize";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type NewAndPopularTopListRenderItemProps = {
    containerRef: MutableRefObject<View>,
    selectCategory: (index: number) => void
    category: Category
    index: number
    selected: boolean
}

const NewAndPopularTopListRenderItem = forwardRef(({ containerRef, selectCategory, category, index, selected }: NewAndPopularTopListRenderItemProps, ref) => {

    const getIconNameByCategory = (): "popcorn" | "fire" | "numeric-10-box" => {
        const iconMap: Record<string, "popcorn" | "fire" | "numeric-10-box"> = {
            "newAndPopularCategory1": "popcorn",
            "newAndPopularCategory2": "fire",
            "newAndPopularCategory3": "numeric-10-box",
            "newAndPopularCategory4": "numeric-10-box",
        };
        return iconMap[category.id] || "popcorn";
    };

    return (
        <Pressable ref={containerRef} style={styles.container} onPress={() => selectCategory(index)}>
            <MaterialCommunityIcons name={getIconNameByCategory()} size={responsiveFontSize(20)} color={colors.red} style={styles.icon} />
            <Text text={category.title} style={[styles.title, { color: selected ? colors.black : colors.white }]} />
        </Pressable>
    )
})

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        marginVertical: 10,
        padding: 5,
        paddingHorizontal: 10,
    },
    icon: {
        padding: 3,
    },
    title: {
        fontSize: responsiveFontSize(17),
        fontWeight: "600"
    }
})

export default NewAndPopularTopListRenderItem;