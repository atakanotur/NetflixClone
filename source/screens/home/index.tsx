import { Banner, Text, HomeList } from "@/source/components";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import categoryStore from '@/source/store/categoryStore';
import movieStore from '@/source/store/movieStore';
import movies from "@/source/data/movie";
import categories from "@/source/data/categories";

const Home = () => {
    // const categories = categoryStore((state) => state.categories);
    // const movies = movieStore((state) => state.movies);


    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <HomeList movies={movies} categories={categories} />
        </SafeAreaView>
    )
}

export default Home;