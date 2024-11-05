import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { ScreenHeader, NewAndPopularList } from "@/source/components";
import localization from '@/source/lib/locales/localization';
import newAndPopularCategoryStore from '@/source/store/newAndPopularCategoryStore';
import categories from '@/source/data/categories';

const NewAndPopular = () => {
    const newAndPopularCategories: Category[] = newAndPopularCategoryStore(state => state.newAndPopularCategories);
    const newAndPopularContents: (Series | Movie)[] = categories.flatMap(category => category.contents);

    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader screenName={localization.t("newAndPopular")} />
            <NewAndPopularList categories={newAndPopularCategories} />
        </SafeAreaView>
    )
}

export default NewAndPopular;