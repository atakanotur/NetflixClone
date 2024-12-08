import { forwardRef, useState, useRef } from 'react';
import { Text } from '@/source/components/Atoms';
import colors from '@/source/theme/colors';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import VideoPlayer from '../../VideoPlayer';
import { Ionicons } from '@expo/vector-icons';
import responsiveFontSize from '@/source/theme/responsiveFontSize';
import localization from '@/source/lib/locales/localization';
import moment from 'moment';
import Animated from "react-native-reanimated"
import ContentNumber from './contentNumber';
import { LinearGradient } from 'expo-linear-gradient';

type NewAndPopularRenderItemProps = {
    content: ContentWithCategory
    indexOfItemInCategory: number
}

export type NewAndPopularRenderItemRef = {

}

const imageSource = "https://www.framestore.com/sites/default/files/styles/logo/public/2022-06/The%20Tomorrow%20War%20Title%20Logo.png?itok=Gt7PHPbu"

const NewAndPopularMainListRenderItem = forwardRef(({ content, indexOfItemInCategory }: NewAndPopularRenderItemProps, ref) => {
    const containerRef = useRef<View>(null);

    const [listAdded, setListAdded] = useState<boolean>(false);

    const remindMe = () => {
        console.log("content : ", content.type);
    }

    const playOnPress = () => {
        console.log("content : ", content)
    }

    const myListButton = () => {

    }

    return (
        <>
            {(content.categoryId === "newAndPopularCategory3" || content.categoryId === "newAndPopularCategory4") && (
                <>
                    <LinearGradient locations={[1, 0]}
                        colors={[colors.whiteGrey, colors.black]}
                        start={{ x: 0.9, y: 0 }}
                        end={{ x: 0, y: 0 }}
                        style={styles.linearGradientContentNumber}>
                        <View style={styles.contentNumber} />
                    </LinearGradient>
                    <ContentNumber index={indexOfItemInCategory} />
                </>
            )}
            <Animated.View ref={containerRef} style={styles.container}>
                <VideoPlayer fullscreen={false} videoSource={content.trailer} visible style={styles.videoPlayer} />
                <Image source={{ uri: imageSource }} resizeMode='center' style={{ height: 80, width: 100 }} />
                <View style={styles.infos}>
                    {content.categoryId === "newAndPopularCategory1" && (content.type === "series" ? (
                        <Text text={content.seasons.length.toString() + ". " + localization.t("newSeasonReleaseDate") + ": " + moment().format("D MMMM")} />
                    ) : (
                        <Text text={localization.t("releaseDate") + ": " + moment().format("D MMMM")} />
                    ))}
                    <Text text={content.plot} style={styles.plot} />
                    <View style={styles.buttons}>
                        {content.categoryId === "newAndPopularCategory1" ?
                            (
                                <Pressable style={[styles.button, styles.whiteButton]} onPress={remindMe}>
                                    <Ionicons name="notifications-outline" size={responsiveFontSize(25)} color={colors.black} style={styles.buttonIcon} />
                                    <Text text={localization.t("remindMe")} style={[styles.buttonText, styles.whiteButtonText]} />
                                </Pressable>
                            ) :
                            (
                                <>
                                    <Pressable style={[styles.button, styles.whiteButton]} onPress={playOnPress}>
                                        <Ionicons name="play-sharp" size={responsiveFontSize(25)} color={colors.black} style={styles.buttonIcon} />
                                        <Text text={localization.t("play")} style={[styles.buttonText, styles.whiteButtonText]} />
                                    </Pressable>
                                    <Pressable style={[styles.button, styles.blackButton]} onPress={() => myListButton()}>
                                        <Ionicons name={listAdded ? "checkmark" : "add"} size={responsiveFontSize(25)} color={colors.whiteGrey} style={styles.buttonIcon} />
                                        <Text text={localization.t("myList")} style={[styles.buttonText, styles.blackButtonText]} />
                                    </Pressable>
                                </>
                            )}
                    </View>
                </View>
            </Animated.View>
        </>
    )
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 10,
        marginBottom: 10,
        paddingTop: 10
    },
    linearGradientContentNumber: {
        height: 35,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderTopLeftRadius: 10,
        transform: [{ translateY: 10 }],
        marginTop: 30,
        zIndex: -2,
        backgroundColor: colors.blue
    },
    contentNumber: {
        height: 35,
        backgroundColor: colors.black,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderTopLeftRadius: 10,
        zIndex: -1
    },
    videoPlayer: {
    },
    infos: {
        padding: 10
    },
    plot: {
        color: colors.whiteGrey,
        fontSize: responsiveFontSize(15),
        marginVertical: 10
    },
    buttons: {
        flexDirection: 'row'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 7
    },
    buttonText: {
        fontSize: responsiveFontSize(16),
        fontWeight: "600",
    },
    buttonIcon: {
        paddingHorizontal: 5
    },
    whiteButton: {
        backgroundColor: colors.white,
    },
    whiteButtonText: {
        color: colors.black
    },
    blackButton: {
        backgroundColor: colors.darkGrey,
        marginLeft: 10
    },
    blackButtonText: {
        color: colors.white
    }
})

export default NewAndPopularMainListRenderItem;