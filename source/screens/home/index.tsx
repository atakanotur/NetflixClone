import { HomeList } from "@/source/components";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import userStore from "@/source/store/userStore";
import contentStore from "@/source/store/contentStore";
import categoryStore from "@/source/store/categoryStore";

const Home = () => {
    const user = userStore((state) => state.user);
    const categories = categoryStore((state) => state.categories);
    const contents = contentStore((state) => state.contents);
    const setUser = userStore((state) => state.setUser);

    const myListOnPress = (content: (Movie | Series)) => {
        if (user.profiles[0].myList.includes(content)) {
            setUser({
                ...user,
                profiles: [{
                    ...user.profiles[0],
                    myList: user.profiles[0].myList.filter((item) => item !== content)
                }]
            });
            return;
        }
        setUser({
            ...user,
            profiles: [{
                ...user.profiles[0],
                myList: [...user.profiles[0].myList, content]
            }]
        })
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

    console.log("user", user.profiles);


    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <HomeList profile={user.profiles[0]} contents={contents} categories={categories} myListOnPress={myListOnPress} playOnPress={playOnPress} posterOnPress={posterOnPress} movieOnPress={movieOnPress} />
        </SafeAreaView>
    )
}

export default Home;