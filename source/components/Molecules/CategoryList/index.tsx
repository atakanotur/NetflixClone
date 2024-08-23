import { forwardRef, Dispatch, useState } from 'react';
import { ScrollView, StyleSheet, Dimensions, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import categories from "@/source/data/categories";
import { Text } from "../../Atoms";
import { Ionicons } from '@expo/vector-icons';
import colors from '@/source/theme/colors';
import responsiveFontSize from '@/source/theme/responsiveFontSize';

type CategoryListProps = {
    visible: boolean;
    setVisible: Dispatch<React.SetStateAction<boolean>>
    selectCategory: (categoryId: string) => void;
};

const { height, width } = Dimensions.get('screen');

const CategoryList = ({ visible = false, selectCategory, setVisible }: CategoryListProps) => {

    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const handleSelectCategory = (categoryId: string) => {
        selectCategory(categoryId);
        setSelectedCategoryId(categoryId);
        setTimeout(() => {
            setVisible(false);
        }, 150);
    }
    if (!visible) return null;

    return (
        <BlurView style={styles.blurView}>
            <ScrollView style={styles.container} scrollEnabled>
                {categories.map((category) => (
                    <Pressable key={category.id} onPress={() => handleSelectCategory(category.id)}>
                        <Text text={category.title} style={selectedCategoryId !== category.id ? styles.categoryTitle : { padding: 20, color: colors.white, fontSize: responsiveFontSize(25), fontWeight: "800" }} />
                    </Pressable>
                ))}
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={() => setVisible(false)}>
                <Ionicons name="close" size={24} color={colors.grey} />
            </Pressable>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    blurView: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        width,
        height,
        zIndex: 2,
    },
    container: {
        flex: 1,
        paddingTop: 20,
    },
    categoryTitle: {
        padding: 20,
        color: colors.whiteGrey,
        fontSize: responsiveFontSize(20),
        fontWeight: "600"
    },
    closeButton: {
        position: 'absolute',
        bottom: 100,
        left: width / 2 - 25,
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    }
});

export default CategoryList;
