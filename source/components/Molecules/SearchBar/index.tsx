import colors from "@/source/theme/colors";
import responsiveFontSize from "@/source/theme/responsiveFontSize";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { TextInput } from "../../Atoms";
import localization from "@/source/lib/locales/localization";

type SearchBarProps = {
    style: StyleProp<ViewStyle>
    onChangeText?: ((text: string) => void)
}

const SearchBar = ({ style, onChangeText }: SearchBarProps) => {
    return (
        <View style={[styles.container, style]}>
            <Ionicons name="search" size={responsiveFontSize(30)} color={colors.whiteGrey} style={styles.icon} />
            <TextInput style={styles.searchInput} placeholder={localization.t("seriesOrMovieSearch")} placeholderTextColor={colors.whiteGrey} onChangeText={onChangeText} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: colors.darkGrey,
        padding: 5,
        borderRadius: 5
    },
    icon: {

    },
    searchInput: {
        flex: 1,
        color: colors.whiteGrey,
        marginLeft: 10,
    }
})

export default SearchBar;