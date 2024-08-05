import { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Pressable, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent } from "react-native";
import { Text } from "../../Atoms";
import { CategoryList, CategoryListHeader, MovieList } from "../../Molecules";
import colors from "@/source/theme/colors";
import localization from "@/source/lib/locales/localization";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import responsiveFontSize from "@/source/theme/responsiveFontSize";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

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
    const onLayoutTopBar = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setTopBarHeight(height);
    };
    const onLayoutTopBarButtons = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setTopBarButtonsHeight(height);
    }

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
            <Animated.View style={[styles.topBarContainer, { height: topBarHeight + top, paddingLeft: topBarPadding, paddingRight: topBarPadding }]}>
                <View style={styles.topBarProfile} onLayout={onLayoutTopBar}>
                    <Text text={profile.name} style={styles.profileName} />
                    <Text text={localization.t("for")} style={styles.for} />
                </View>
                <View style={styles.topBarIcons}>
                    <MaterialIcons name="cast" size={responsiveFontSize(30)} color={colors.white} style={styles.topBarIcon} />
                    <Octicons name="download" size={responsiveFontSize(30)} color={colors.white} style={styles.topBarIcon} />
                    <Ionicons name="search" size={responsiveFontSize(30)} color={colors.white} style={styles.topBarIcon} />
                </View>
                <BlurView style={styles.blurView} intensity={topBarBlurIntensity.value}></BlurView>
            </Animated.View>
            <Animated.View style={[styles.topBarButtons, { top: topBarButtonsPosition, opacity: topBarButtonsOpacity }]} onLayout={onLayoutTopBarButtons}>
                <Pressable style={styles.topBarButton}>
                    <Text text={localization.t("series")} style={styles.topBarButtonText} />
                </Pressable>
                <Pressable style={styles.topBarButton}>
                    <Text text={localization.t("movies")} style={styles.topBarButtonText} />
                </Pressable>
                <Pressable style={[styles.topBarButton, { flexDirection: 'row' }]}>
                    <Text text={localization.t("categories")} style={styles.topBarButtonText} />
                    <Ionicons name="chevron-down" size={responsiveFontSize(20)} color={colors.whiteGrey} style={{ marginLeft: 5 }} />
                </Pressable>
            </Animated.View>
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
    container: {

    },
    topBarContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        zIndex: 2,
    },
    topBarProfile: {
        flexDirection: 'row',
        padding: 5,
        zIndex: 1
    },
    topBarIcons: {
        flexDirection: 'row',
        padding: 5,
        zIndex: 1
    },
    profileName: {
        fontSize: responsiveFontSize(25),
        fontWeight: 'bold',
    },
    for: {
        fontSize: responsiveFontSize(25),
        fontWeight: 'bold',
        marginLeft: 5
    },
    topBarIcon: {
        marginLeft: 25
    },
    topBarButtons: {
        position: 'absolute',
        left: 0,
        right: 0,
        flexDirection: 'row',
        zIndex: 1
    },
    topBarButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: colors.whiteGrey,
        marginLeft: 5,
        marginTop: 10,
        padding: 5,
        paddingLeft: 13,
        paddingRight: 13
    },
    topBarButtonText: {
        color: colors.whiteGrey,
        fontSize: responsiveFontSize(15),
        fontWeight: "bold"
    },
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
    blurView: {
        zIndex: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
});

export default HomeList;