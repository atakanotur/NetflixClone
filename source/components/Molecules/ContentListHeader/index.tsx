import { useState } from 'react';
import categories from "@/source/data/categories";
import colors from "@/source/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { View, ImageBackground, Pressable, StyleSheet, Dimensions } from "react-native"
import { Text } from "../../Atoms";
import localization from "@/source/lib/locales/localization";
import responsiveFontSize from '@/source/theme/responsiveFontSize';

const { height } = Dimensions.get('screen');

type CategoryListHeaderProps = {
    content: Series | Movie
    posterOnPress: (movie: Series | Movie) => void;
    playOnPress: (movie: Series | Movie) => void;
    myListOnPress: (movie: Series | Movie) => void;
}

const ContentListHeader = ({ content, posterOnPress, playOnPress, myListOnPress }: CategoryListHeaderProps) => {
    const [listAdded, setListAdded] = useState<boolean>(false);
    const myListButton = () => {
        setListAdded(!listAdded);
        myListOnPress(content)
    }

    return (
        <Pressable style={styles.container} onPress={() => posterOnPress(content)}>
            <ImageBackground style={styles.posterContainer} source={{ uri: categories[0].contents[1].poster }} resizeMode="cover" imageStyle={styles.poster}>
                <View style={styles.buttons}>
                    <Pressable style={styles.playButtonContainer} onPress={() => playOnPress(content)}>
                        <Ionicons name="play-sharp" size={25} color={colors.black} />
                        <Text text={localization.t("play")} style={[styles.buttonText, { color: colors.black }]} />
                    </Pressable>
                    <Pressable style={styles.myListButtonContainer} onPress={() => myListButton()}>
                        <Ionicons name={listAdded ? "checkmark" : "add"} size={25} color={colors.whiteGrey} />
                        <Text text={localization.t("myList")} style={styles.buttonText} />
                    </Pressable>
                </View>
            </ImageBackground>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height / 1.5,
        padding: 20
    },
    posterContainer: {
        height: "100%",
        width: "100%",
        justifyContent: 'flex-end',
    },
    poster: {
        borderRadius: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    buttonText: {
        color: colors.whiteGrey,
        paddingLeft: 5,
        fontWeight: "bold",
        fontSize: responsiveFontSize(15)
    },
    playButtonContainer: {
        flex: 1,
        backgroundColor: colors.whiteGrey,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        margin: 10,
        marginRight: 5,
        padding: 5
    },
    myListButtonContainer: {
        flex: 1,
        backgroundColor: colors.grey,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        margin: 10,
        marginLeft: 5,
    },
})

export default ContentListHeader;