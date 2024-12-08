import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { ScreenHeader, NewAndPopularList } from "@/source/components";
import localization from '@/source/lib/locales/localization';
import newAndPopularCategoryStore from '@/source/store/newAndPopularCategoryStore';

const NewAndPopular = () => {
    const newAndPopularCategories: Category[] = newAndPopularCategoryStore(state => state.newAndPopularCategories);

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <ScreenHeader screenName={localization.t("newAndPopular")} />
            <NewAndPopularList categories={newAndPopularCategories} />
        </SafeAreaView>
    )
}

export default NewAndPopular;