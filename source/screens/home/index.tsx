import { HomeList } from "@/source/components";
import { View } from 'react-native';
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
    const profile = userStore((state) => state.profile);

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

    const playOnPress = (content: Series | Movie) => {
        console.log("playOnPress", content);
    }

    const posterOnPress = (content: Series | Movie) => {
        console.log("posterOnPress", content);
    }

    const movieOnPress = (content: Series | Movie) => {
        console.log("movieOnPress", content);
    }

    return (
        <View style={styles.container}>
            <HomeList profile={profile} contents={contents} categories={categories} myListOnPress={myListOnPress} playOnPress={playOnPress} posterOnPress={posterOnPress} movieOnPress={movieOnPress} />
        </View>
    )
}

export default Home;