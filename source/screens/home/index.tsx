import { Text } from "@/source/components";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";

const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text text="Home" />
        </SafeAreaView>
    )
}

export default Home;