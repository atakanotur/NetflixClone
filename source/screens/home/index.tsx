import { useState } from 'react';
import { Alert } from "react-native";
import { HomeList, VideoPlayer } from "@/source/components";
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

    const [videoPlayerVisible, setVideoPlayerVisible] = useState<boolean>(false);
    const [videoPlayerFullscreen, setVideoPlayerFullscreen] = useState<boolean>(false);
    const [videoSource, setVideoSource] = useState<string>("");

    const myListOnPress = (content: (Movie | Series)) => {
        if (user.profiles[0].myList.includes(content)) return updateUserMyList(user.profiles[0].myList.filter((item) => item !== content));
        return updateUserMyList([...user.profiles[0].myList, content]);
    }

    const updateUserMyList = (myList: (Movie | Series)[]) => {
        setUser({
            ...user,
            profiles: [{
                ...user.profiles[0],
                myList
            }]
        })
    }

    const playOnPress = (content: Series | Movie) => {
        console.log("playOnPress", content);
    }

    const posterOnPress = (content: Series | Movie) => {
        console.log("posterOnPress", content);
    }

    const contentOnPress = (content: Series | Movie) => {
        console.log("contentOnPress", content);
        if (!content) return Alert.alert("Error", "Content not found", [{ text: "OK" }]);
        setVideoSource(content.trailer);
        setVideoPlayerFullscreen(true);
        setVideoPlayerVisible(true);
    }

    return (
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
            <HomeList
                profile={profile}
                contents={contents}
                categories={categories}
                myListOnPress={myListOnPress}
                playOnPress={playOnPress}
                posterOnPress={posterOnPress}
                contentOnPress={contentOnPress}
            />
            <VideoPlayer visible={videoPlayerVisible} fullscreen={videoPlayerFullscreen} videoSource={videoSource} />
        </SafeAreaView>
    )
}

export default Home;