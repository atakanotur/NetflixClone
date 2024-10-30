import { View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { ScreenHeader, NewAndPopularList } from "@/source/components";

const NewAndPopular = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader />
            <NewAndPopularList renderItem={() => { return <View /> }} />
        </SafeAreaView>
    )
}

export default NewAndPopular;