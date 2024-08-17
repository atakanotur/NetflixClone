import { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Pressable, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { Text } from "../../Atoms";
import { CategoryList, CategoryListHeader, MovieList, TopBar } from "../../Molecules";
import colors from "@/source/theme/colors";
import { ReduceMotion, useSharedValue, withSpring, withTiming, Easing } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HomeListProps = {
    profile: Profile
    categories: Category[]
    contents: (Series | Movie)[]
    myListOnPress: (content: Series | Movie) => void;
    playOnPress: (content: Series | Movie) => void;
    posterOnPress: (content: Series | Movie) => void;
    movieOnPress: (content: Series | Movie) => void;
}

const { width } = Dimensions.get('screen');

const HomeList = ({ profile, categories, contents, myListOnPress, playOnPress, posterOnPress, movieOnPress }: HomeListProps) => {
    const [tempCategories, setTempCategories] = useState<Category[]>(categories);
    console.log("contents", contents);
    const { top } = useSafeAreaInsets();
    const [topBarHeight, setTopBarHeight] = useState(0);
    const [topBarButtonsHeight, setTopBarButtonsHeight] = useState(0);
    const topBarPadding = useSharedValue(15);
    const topBarButtonsPosition = useSharedValue(topBarHeight + top);
    const topBarButtonsOpacity = useSharedValue(1);
    const topBarBlurIntensity = useSharedValue(0);

    const categoryListOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (event.nativeEvent.contentOffset.y > -top * 2 + 10) {
            topBarPadding.value = withSpring(10);
            topBarButtonsPosition.value = withTiming((topBarHeight + top) - topBarButtonsHeight, { duration: 250, easing: Easing.out(Easing.quad), reduceMotion: ReduceMotion.System });
            topBarButtonsOpacity.value = withSpring(0, { duration: 1000 });
            topBarBlurIntensity.value = withSpring(40, { duration: 1200 });
        }
        else {
            topBarPadding.value = withSpring(0);
            topBarButtonsPosition.value = withTiming(topBarHeight + top + 5, { duration: 250, easing: Easing.out(Easing.quad), reduceMotion: ReduceMotion.System });
            topBarButtonsOpacity.value = withSpring(1);
            topBarBlurIntensity.value = withSpring(0, { duration: 1200 });
        }
    }

    const movieListRenderItem = ({ item, index }: { item: any, index: number }) => {
        return (
            <View style={styles.movieContainer}>
                <Pressable onPress={() => movieOnPress({ ...contents[0] })}>
                    <Image source={{ uri: item.poster }} style={styles.moviePoster} resizeMode="stretch" />
                </Pressable>
            </View>
        )
    }

    const categoryListRenderItem = ({ item, index }: { item: Category, index: number }) => {
        return (
            <View style={styles.categoryContainer}>
                <Text text={item.title} style={styles.categoryTitle} />
                <MovieList
                    data={categories[index].contents}
                    renderItem={movieListRenderItem}
                />
            </View>
        )
    }

    const onChangeContenType = (contentType: "movie" | "series" | "mixed") => {
        console.log('onChangeContenType', contentType);
        if (contentType === "movie") return setTempCategories(categories.filter((category) => category.type === "movie"));
        if (contentType === "series") return setTempCategories(categories.filter((category) => category.type === "series"));
        if (contentType === "mixed") return setTempCategories(categories.filter((category) => category.type === "mixed"));
    }

    return (
        <>
            <TopBar top={top} profile={profile} topBarBlurIntensity={topBarBlurIntensity} topBarPadding={topBarPadding} topBarButtonsPosition={topBarButtonsPosition} topBarButtonsOpacity={topBarButtonsOpacity} setTopBarButtonsHeight={(event) => setTopBarButtonsHeight(event.nativeEvent.layout.height)} setTopBarHeight={(event) => setTopBarHeight(event.nativeEvent.layout.height)} onChangeContentType={(contentType) => onChangeContenType(contentType)} />
            <CategoryList
                data={tempCategories}
                extraData={tempCategories}
                renderItem={({ item, index }: { item: Category, index: number }) => categoryListRenderItem({ item, index })}
                ListHeaderComponent={<CategoryListHeader content={contents[0]} myListOnPress={myListOnPress} playOnPress={playOnPress} posterOnPress={posterOnPress} />}
                onScroll={categoryListOnScroll}
                contentInset={{ top: top * 2 + topBarHeight + 5, left: 0, right: 0, bottom: 0 }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        padding: 5,
        margin: 5
    },
    categoryTitle: {
        color: colors.white,
        fontWeight: "bold",
        padding: 10
    },
    movieContainer: {
        height: (width / 3.275) * 1.3,
        width: width / 3.275,
        margin: 5
    },
    moviePoster: {
        height: (width / 3.275) * 1.3,
        width: width / 3.275,
        borderRadius: 5,
    },

});

export default HomeList;