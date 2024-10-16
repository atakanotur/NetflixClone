import { forwardRef, useState, useRef } from "react"
import { View, Dimensions, LayoutChangeEvent, Pressable, StyleSheet, Image, GestureResponderEvent, Modal } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, } from "react-native-reanimated"

type PosterModeProps = {
    content: Series | Movie,
    index: number
}

const { width, height } = Dimensions.get('window');
const posterWidth: number = width / 3.275;
const posterHeight: number = posterWidth * 1.3;
let modalAnimationTempLeft = 0;
let modalAnimationTempTop = 0;

const PosterMode = forwardRef(({ content, index }: PosterModeProps, ref) => {
    const containerRef = useRef<Animated.View>({} as Animated.View);

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const AnimatedModal = Animated.createAnimatedComponent(Modal);

    const [isPortalView, setIsPortalView] = useState<boolean>(false);

    const [expanded, setExpanded] = useState<boolean>(false);

    //Content Animation Styles
    const contentAnimationHeight = useSharedValue(posterHeight);
    const contentAnimationWidth = useSharedValue(posterWidth);
    const contentAnimationMargin = useSharedValue(5);

    const contentStyle = useAnimatedStyle(() => {
        return {
            height: contentAnimationHeight.value,
            width: contentAnimationWidth.value,
            margin: contentAnimationMargin.value,
            alignItems: 'center',
            justifyContent: 'center'
        }
    });

    //Modal Animation Styles
    const modalAnimationHeight = useSharedValue(posterHeight);
    const modalAnimationWidth = useSharedValue(posterWidth);

    const modalAnimationPosition = useSharedValue<"relative" | "absolute" | "static">("relative");

    const modalAnimationStyle = useAnimatedStyle(() => {
        return {
            height: modalAnimationHeight.value,
            width: modalAnimationWidth.value,
            alignItems: 'center',
            justifyContent: 'center',
            position: modalAnimationPosition.value,
        }
    });

    const modalContainerAnimationLeft = useSharedValue(0);
    const modalContainerAnimationTop = useSharedValue(0);

    const modalContainerAnimationStyle = useAnimatedStyle(() => {
        return {
            height: modalAnimationHeight.value,
            width: modalAnimationWidth.value,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ translateX: modalContainerAnimationLeft.value }, { translateY: modalContainerAnimationTop.value }]
        }
    })

    //Poster Animation Styles
    const posterAnimationHeight = useSharedValue(posterHeight);
    const posterAnimationWidth = useSharedValue(posterWidth);
    const posterAnimationStyle = useAnimatedStyle(() => {
        return {
            height: posterAnimationHeight.value,
            width: posterAnimationWidth.value,
            borderRadius: 5,
        }
    });

    const contentOnPress = () => {
        // detailModeRef.current?.openAnimation();
        contentOpenAnimation();
    }

    const contentOpenAnimation = () => {
        getStartAndTempPositions();
        setTimeout(() => {
            if (!expanded) openDetailModeAnimation();
            else closeDetailModeAnimation();
            setExpanded(!expanded)
        }, 1000);
    }

    const getStartAndTempPositions = () => {
        containerRef.current?.measure((x, y, width, height, pageX, pageY) => {
            if (!expanded) {
                modalAnimationTempLeft = pageX;
                modalAnimationTempTop = pageY;

                modalContainerAnimationLeft.value = pageX + posterWidth + 15
                modalContainerAnimationTop.value = pageY
            }
        });
    }

    const openDetailModeAnimation = () => {
        setIsPortalView(true)
        modalAnimationPosition.value = "absolute";

        modalAnimationHeight.value = withTiming(height, { duration: 1500 });
        modalAnimationWidth.value = withTiming(width, { duration: 1500 });

        modalContainerAnimationTop.value = withTiming(0, { duration: 1500 });
        modalContainerAnimationLeft.value = withTiming(0, { duration: 1500 });

        posterAnimationHeight.value = withTiming(height, { duration: 1500 });
        posterAnimationWidth.value = withTiming(width, { duration: 1500 });
    }

    const closeDetailModeAnimation = () => {
        setTimeout(() => {
            setIsPortalView(false)
            modalAnimationPosition.value = "relative";
        }, 2600);

        modalAnimationHeight.value = withTiming(posterHeight, { duration: 1500 });
        modalAnimationWidth.value = withTiming(posterWidth, { duration: 1500 });

        modalContainerAnimationLeft.value = withTiming(modalAnimationTempLeft + posterWidth + 15, { duration: 1500 });
        modalContainerAnimationTop.value = withTiming(modalAnimationTempTop, { duration: 1500 });

        posterAnimationHeight.value = withTiming(posterHeight, { duration: 1500 });
        posterAnimationWidth.value = withTiming(posterWidth, { duration: 1500 });
    }

    if (isPortalView) {
        return (
            <>
                <AnimatedModal visible={true} style={modalAnimationStyle} transparent animationType="none">
                    <Animated.View style={modalContainerAnimationStyle} ref={containerRef}>
                        <AnimatedPressable onPress={contentOnPress} style={contentStyle}>
                            <Animated.Image source={{ uri: content.poster }} style={posterAnimationStyle} resizeMode="stretch" />
                        </AnimatedPressable>
                    </Animated.View>
                    <View style={styles.container} />
                </AnimatedModal>
                <View style={styles.container}>
                    <Image source={{ uri: content.poster }} style={styles.poster} resizeMode="cover" />
                </View>
            </>
        )
    }

    return (
        <Animated.View style={styles.container} ref={containerRef}>
            <AnimatedPressable onPress={contentOnPress} style={contentStyle}>
                <Animated.Image source={{ uri: content.poster }} style={posterAnimationStyle} resizeMode="stretch" />
            </AnimatedPressable>
        </Animated.View>
    )
});

const styles = StyleSheet.create({
    container: {
        height: posterHeight,
        width: posterWidth,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    poster: {
        height: posterHeight,
        width: posterWidth,
        borderRadius: 5
    }
});

export default PosterMode;