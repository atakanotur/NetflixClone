import { LegacyRef, forwardRef } from "react"
import { View, Pressable, StyleSheet, Image, GestureResponderEvent } from "react-native"


type PosterModeProps = {
    posterModeContainerRef?: LegacyRef<View>
    content: Series | Movie,
    posterHeight: number,
    posterWidth: number,
    posterOnPress: ((event: GestureResponderEvent) => void)
}

const PosterMode = forwardRef(({ posterModeContainerRef, content, posterHeight, posterWidth, posterOnPress }: PosterModeProps, ref) => {
    return (
        <View ref={posterModeContainerRef} style={[styles.container, { height: posterHeight, width: posterWidth }]}>
            <Pressable onPress={posterOnPress}>
                <Image source={{ uri: content.poster }} style={[styles.poster, { height: posterHeight, width: posterWidth }]} resizeMode="stretch" />
            </Pressable>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        margin: 5,
    },
    poster: {
        borderRadius: 5
    },
});

export default PosterMode;