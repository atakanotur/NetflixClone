import { LayoutChangeEvent, Pressable, Text as RNText, StyleSheet } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/source/theme/colors';
import responsiveFontSize from '@/source/theme/responsiveFontSize';
import localization from '@/source/lib/locales/localization';
import { useAnimatedValues } from './animations';
import { Text } from '../../Atoms';

type ButtonsProps = {
    topBarButtonsPosition: SharedValue<number>
    topBarButtonsOpacity: SharedValue<number>
    selectContentType: (contentType: "movie" | "series" | "mixed") => void
    handleLayout: (setState: (value: number) => void) => (event: LayoutChangeEvent) => void
    setTopBarButtonsHeight: (event: LayoutChangeEvent) => void
    setXButtonWidth: (value: number) => void
    setSeriesButtonWidth: (value: number) => void
    setMoviesButtonWidth: (value: number) => void
    setCategoriesButtonWidth: (value: number) => void
    setCategoryListVisible: (value: boolean) => void
    categories: Category[]
}

const Buttons = ({ topBarButtonsPosition, topBarButtonsOpacity, selectContentType, handleLayout, setTopBarButtonsHeight, categories, setMoviesButtonWidth, setSeriesButtonWidth, setXButtonWidth, setCategoriesButtonWidth, setCategoryListVisible }: ButtonsProps) => {
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const AnimatedRNText = Animated.createAnimatedComponent(RNText);
    const values = useAnimatedValues();
    return (
        <Animated.View style={[styles.buttons, { top: topBarButtonsPosition, opacity: topBarButtonsOpacity }]} onLayout={setTopBarButtonsHeight}>
            <AnimatedPressable onPress={() => selectContentType("mixed")} style={[styles.xButton, { zIndex: 7, left: values.xButtonLeft, opacity: values.xButtonOpacity }]} onLayout={handleLayout(setXButtonWidth)}>
                <Ionicons name="close" size={responsiveFontSize(25)} color={colors.white} />
            </AnimatedPressable>
            <AnimatedPressable onPress={() => selectContentType("series")} style={[styles.button, { zIndex: 6, left: values.seriesButtonLeft, opacity: values.seriesButtonOpacity, backgroundColor: values.seriesButtonBackground }]} onLayout={handleLayout(setSeriesButtonWidth)}>
                <AnimatedRNText style={[styles.buttonText, { color: values.seriesButtonTextColor }]}>
                    {localization.t("series")}
                </AnimatedRNText>
            </AnimatedPressable>
            <AnimatedPressable onPress={() => selectContentType("movie")} style={[styles.button, { zIndex: 5, left: values.moviesButtonLeft, opacity: values.moviesButtonOpacity, backgroundColor: values.moviesButtonBackground }]} onLayout={handleLayout(setMoviesButtonWidth)}>
                <AnimatedRNText style={[styles.buttonText, { color: values.moviesButtonTextColor }]}>
                    {localization.t("movies")}
                </AnimatedRNText>
            </AnimatedPressable>
            <AnimatedPressable style={[styles.button, { flexDirection: 'row', zIndex: 4, left: values.categoriesButtonLeft, opacity: values.categoriesButtonOpacity }]} onLayout={handleLayout(setCategoriesButtonWidth)} onPress={() => setCategoryListVisible(true)}>
                <Text text={localization.t("categories")} style={styles.buttonText} />
                <Ionicons name="chevron-down" size={responsiveFontSize(20)} color={colors.whiteGrey} style={{ marginLeft: 5 }} />
            </AnimatedPressable>
            <AnimatedPressable style={[styles.button, { flexDirection: 'row', zIndex: 3, left: values.allCategoriesButtonLeft, opacity: values.allCategoriesButtonOpacity }]} >
                <Text text={localization.t("allCategories")} style={styles.buttonText} />
                <Ionicons name="chevron-down" size={responsiveFontSize(20)} color={colors.whiteGrey} style={{ marginLeft: 5 }} />
            </AnimatedPressable>
            <AnimatedPressable style={[styles.button, { backgroundColor: colors.whiteGrey, zIndex: 2, left: values.categoryButtonLeft, opacity: values.categoryButtonOpacity, flexDirection: 'row' }]} onPress={() => setCategoryListVisible(true)}>
                <Text text={categories.find((category) => category.id === selectedCategoryId)?.title} style={[styles.buttonText, { color: colors.white }]} />
                <Ionicons name="chevron-down" size={responsiveFontSize(20)} color={colors.whiteGrey} style={{ marginLeft: 5 }} />
            </AnimatedPressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginLeft: 25
    },
    buttons: {
        position: 'absolute',
        left: 5,
        right: 0,
        zIndex: 1,
    },
    button: {
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: colors.whiteGrey,
        padding: 7,
        paddingLeft: 13,
        paddingRight: 13,
    },
    xButton: {
        width: 30,
        height: 30,
        padding: 0,
        paddingLeft: 0,
        paddingRight: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: colors.whiteGrey,
    },
    buttonText: {
        color: colors.whiteGrey,
        fontSize: responsiveFontSize(15),
        fontWeight: "bold"
    },
})

export default Buttons;