import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { Text, SearchBar, RecommendedContentList, SearchedContentList, ContentList, ContentListRenderItem } from "@/source/components";
import localization from "@/source/lib/locales/localization";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/source/theme/colors";
import responsiveFontSize from "@/source/theme/responsiveFontSize";
import { router } from "expo-router";
import contentStore from "@/source/store/contentStore";

const Search = () => {
    const [searchText, setSearchText] = useState<string>("");

    const recommendedContents = contentStore(state => state.recommendedContents);

    const contents = contentStore(state => state.contents);

    const [searchedContents, setSearchedContents] = useState<Content[]>(contents);

    const onChangeSearchText = (text: string) => {
        setSearchText(text);
        search(text);
    }

    const search = (text: string) => {
        const filteredContents = contents.filter(content =>
            content.title.toLowerCase().includes(text.toLowerCase())
        );
        setSearchedContents(filteredContents);
    }

    const isSearched = (): boolean => {
        if (searchText === "") return true;
        return false;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="chevron-back" color={colors.white} size={responsiveFontSize(30)} style={styles.backIcon} onPress={() => router.back()} />
                <SearchBar style={styles.searchBar} onChangeText={onChangeSearchText} />
            </View>
            {isSearched() ? <RecommendedContentList contents={recommendedContents} /> : <SearchedContentList contents={searchedContents} />}
        </SafeAreaView>
    )
}

export default Search;