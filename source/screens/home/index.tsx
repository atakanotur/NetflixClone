import { Banner, Text, HomeList } from "@/source/components";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import categoryStore from '@/source/store/categoryStore';
import movieStore from '@/source/store/movieStore';
import contents from "@/source/data/content";
import categories from "@/source/data/categories";
import user from "@/source/data/user";
import userStore from "@/source/store/userStore";

const Home = () => {
    // const categories = categoryStore((state) => state.categories);
    // const movies = movieStore((state) => state.movies);

    const myListOnPress = (movie: EntertainmentContent) => {
        console.log("myListOnPress", movie);
    }

    const playOnPress = (movie: EntertainmentContent) => {
        console.log("playOnPress", movie);
    }

    const posterOnPress = (movie: EntertainmentContent) => {
        console.log("posterOnPress", movie);
    }

    const movieOnPress = (movie: EntertainmentContent) => {
        console.log("movieOnPress", movie);
    }

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <HomeList profile={user.profiles[0]} contents={contents} categories={categories} myListOnPress={myListOnPress} playOnPress={playOnPress} posterOnPress={posterOnPress} movieOnPress={movieOnPress} />
        </SafeAreaView>
    )
}

export default Home;