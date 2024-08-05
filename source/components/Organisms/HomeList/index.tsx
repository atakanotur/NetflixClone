import { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Pressable, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent } from "react-native";
import { Text } from "../../Atoms";
import { CategoryList, CategoryListHeader, MovieList, TopBar } from "../../Molecules";
import colors from "@/source/theme/colors";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HomeListProps = {
    profile: Profile
    categories: Category[]
    movies: Movie[],
    myListOnPress: (movie: Movie) => void;
    playOnPress: (movie: Movie) => void;
    posterOnPress: (movie: Movie) => void;
}

const { width } = Dimensions.get('screen');

const HomeList = ({ profile, categories, movies, myListOnPress, playOnPress, posterOnPress }: HomeListProps) => {
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
            topBarButtonsPosition.value = withSpring((topBarHeight + top) - topBarButtonsHeight, { duration: 2000 });
            topBarButtonsOpacity.value = withSpring(0, { duration: 1200 });
            topBarBlurIntensity.value = withSpring(40, { duration: 1200 });
        }
        else {
            topBarPadding.value = withSpring(0);
            topBarButtonsPosition.value = withSpring(topBarHeight + top)
            topBarButtonsOpacity.value = withSpring(1);
            topBarBlurIntensity.value = withSpring(0, { duration: 1200 });
        }
    }

    const movieListRenderItem = ({ item, index }: { item: MovieRepresentation, index: number }) => {
        return (
            <View style={styles.movieContainer}>
                <Pressable>
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
                    data={categories[index].movies}
                    renderItem={movieListRenderItem}
                />
            </View>
        )
    }

    return (
        <>
            <TopBar top={top} profile={profile} topBarBlurIntensity={topBarBlurIntensity} topBarPadding={topBarPadding} topBarButtonsPosition={topBarButtonsPosition} topBarButtonsOpacity={topBarButtonsOpacity} setTopBarButtonsHeight={(event) => setTopBarButtonsHeight(event.nativeEvent.layout.height)} setTopBarHeight={(event) => setTopBarHeight(event.nativeEvent.layout.height)} />
            <CategoryList
                data={categories}
                renderItem={({ item, index }: { item: Category, index: number }) => categoryListRenderItem({ item, index })}
                ListHeaderComponent={<CategoryListHeader myListOnPress={myListOnPress} playOnPress={playOnPress} posterOnPress={posterOnPress} />}
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