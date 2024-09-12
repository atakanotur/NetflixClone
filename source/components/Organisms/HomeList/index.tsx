import { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Pressable, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { Text } from "../../Atoms";
import { MainList, ContentListHeader, ContentList, TopBar, VideoPlayer } from "../../Molecules";
import colors from "@/source/theme/colors";
import { ReduceMotion, useSharedValue, withSpring, withTiming, Easing } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HomeListProps = {
    profile: Profile;
    categories: Category[];
    contents: (Series | Movie)[];
    myListOnPress: (content: Series | Movie) => void;
    playOnPress: (content: Series | Movie) => void;
    posterOnPress: (content: Series | Movie) => void;
    contentOnPress: (content: Series | Movie) => void;
}

const { width } = Dimensions.get('screen');

const HomeList = ({ profile, categories, contents, myListOnPress, playOnPress, posterOnPress, contentOnPress }: HomeListProps) => {
    const [tempCategories, setTempCategories] = useState<Category[]>(categories);
    const { top } = useSafeAreaInsets();
    const [topBarHeight, setTopBarHeight] = useState(0);
    const [topBarButtonsHeight, setTopBarButtonsHeight] = useState(0);
    const topBarPadding = useSharedValue(15);
    const topBarButtonsPosition = useSharedValue(topBarHeight + top);
    const topBarButtonsOpacity = useSharedValue(1);
    const topBarBlurIntensity = useSharedValue(0);

    const categoryListOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (event.nativeEvent.contentOffset.y > top) return applyTopBarScrollEffect();
        resetTopBarScrollEffect();
    }

    const applyTopBarScrollEffect = () => {
        topBarPadding.value = withSpring(10);
        topBarButtonsPosition.value = withTiming((topBarHeight + top) - topBarButtonsHeight, { duration: 250, easing: Easing.out(Easing.quad), reduceMotion: ReduceMotion.System });
        topBarButtonsOpacity.value = withSpring(0, { duration: 1000 });
        topBarBlurIntensity.value = withSpring(40, { duration: 1200 });
    }

    const resetTopBarScrollEffect = () => {
        topBarPadding.value = withSpring(0);
        topBarButtonsPosition.value = withTiming(topBarHeight + top + 5, { duration: 250, easing: Easing.out(Easing.quad), reduceMotion: ReduceMotion.System });
        topBarButtonsOpacity.value = withSpring(1);
        topBarBlurIntensity.value = withSpring(0, { duration: 1200 });
    }

    const contentListRenderItem = ({ item, index }: { item: Series | Movie, index: number }) => {
        return (
            <View style={styles.contentContainer}>
                <Pressable onPress={() => contentOnPress(item)}>
                    <Image source={{ uri: item.poster }} style={styles.contentPoster} resizeMode="stretch" />
                </Pressable>
            </View>
        )
    }

    const onChangeContenType = (contentType: "movie" | "series" | "mixed") => {
        if (contentType === "movie") return setTempCategories(categories.filter((category) => category.type === "movie"));
        if (contentType === "series") return setTempCategories(categories.filter((category) => category.type === "series"));
        if (contentType === "mixed") return setTempCategories(categories.filter((category) => category.type === "mixed"));
    }

    const onChangeCategory = (categoryId: string) => {
        setTempCategories(categories.filter((category) => category.id === categoryId));
    }

    const mainListRenderItem = ({ item, index }: { item: Category, index: number }) => {
        return (
            <View style={styles.categoryContainer}>
                <Text text={item.title} style={styles.categoryTitle} />
                <ContentList
                    data={categories[index].contents}
                    renderItem={contentListRenderItem}
                />
            </View>
        )
    }

    return (
        <>
            <TopBar
                top={top}
                profile={profile}
                categories={categories}
                topBarBlurIntensity={topBarBlurIntensity}
                topBarPadding={topBarPadding}
                topBarButtonsPosition={topBarButtonsPosition}
                topBarButtonsOpacity={topBarButtonsOpacity}
                setTopBarButtonsHeight={(event) => setTopBarButtonsHeight(event.nativeEvent.layout.height)}
                setTopBarHeight={(event) => setTopBarHeight(event.nativeEvent.layout.height)}
                onChangeContentType={onChangeContenType}
                onChangeCategory={onChangeCategory}
            />
            <MainList
                data={tempCategories}
                extraData={tempCategories}
                renderItem={({ item, index }: { item: Category, index: number }) => mainListRenderItem({ item, index })}
                ListHeaderComponent={<ContentListHeader content={tempCategories[0]?.contents[0]} myListOnPress={myListOnPress} playOnPress={playOnPress} posterOnPress={posterOnPress} />}
                onScroll={categoryListOnScroll}
                contentContainerStyle={{ paddingTop: top + topBarHeight + topBarButtonsHeight }}
                contentInset={{ top: 1 }}
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
    contentContainer: {
        height: (width / 3.275) * 1.3,
        width: width / 3.275,
        margin: 5
    },
    contentPoster: {
        height: (width / 3.275) * 1.3,
        width: width / 3.275,
        borderRadius: 5,
    },

});

export default HomeList;