import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Text } from "../../Atoms";
import { CategoryList, CategoryListHeader, MovieList } from "../../Molecules";
import colors from "@/source/theme/colors";
import localization from "@/source/lib/locales/localization";

type HomeListProps = {
    profile: Profile
    categories: Category[]
    movies: Movie[]
}

const { width } = Dimensions.get('screen');

const HomeList = ({ profile, categories, movies }: HomeListProps) => {
    const movieListRenderItem = ({ item, index }: { item: MovieRepresentation, index: number }) => {
        return (
            <View style={styles.movieContainer}>
                <Image source={{ uri: item.poster }} style={styles.moviePoster} resizeMode="stretch" />
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
            <View>
                <View>
                    <Text text={profile.name} />
                    <Text text={localization.t("for")} />
                </View>
                <View>

                </View>
            </View>
            <CategoryList
                data={categories}
                renderItem={({ item, index }: { item: Category, index: number }) => categoryListRenderItem({ item, index })}
                ListHeaderComponent={CategoryListHeader}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    categoryContainer: {
        padding: 5,
    },
    categoryTitle: {
        color: colors.white,
        fontWeight: "bold",
        padding: 10
    },
    movieContainer: {
        height: (width / 3.275) * 1.3,
        width: width / 3.275,
    },
    moviePoster: {
        height: (width / 3.275) * 1.3,
        width: width / 3.275,
        borderRadius: 5,
    },
});

export default HomeList;