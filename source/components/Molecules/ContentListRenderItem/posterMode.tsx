import { forwardRef, useState, useRef, useImperativeHandle } from "react"
import { View, Dimensions, Pressable, StyleSheet, Image, Modal } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, } from "react-native-reanimated"
import DetailMode, { DetailModeRef } from "./detailMode"

type PosterModeProps = {
    content: Series | Movie,
}

export type PosterModeRef = {
    detailModeCloseAnimation: () => void
}

const { width, height } = Dimensions.get('window');
const posterWidth: number = width / 3.275;
const posterHeight: number = posterWidth * 1.3;
let modalAnimationTempLeft = 0;
let modalAnimationTempTop = 0;

const PosterMode = forwardRef(({ content }: PosterModeProps, ref) => {
    const containerRef = useRef<Animated.View>({} as Animated.View);
    const detailModeRef = useRef<DetailModeRef>(null);

    useImperativeHandle(ref, () => ({
        animateDetailModeClose
    }));

    const AnimatedModal = Animated.createAnimatedComponent(Modal);

    const [isDetailMode, setIsDetailMode] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);

    const animationDuration: number = 400;

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
            borderRadius: 5
        }
    });

    //Modal Container Animation Styles
    const modalContainerAnimationLeft = useSharedValue(0);
    const modalContainerAnimationTop = useSharedValue(0);

    const modalContainerAnimationStyle = useAnimatedStyle(() => {
        return {
            borderRadius: 15,
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

    const posterOnPress = () => {
        triggerAnimateDetailModeOpen();
    }

    const triggerAnimateDetailModeOpen = () => {
        capturePosterInitialPosition();
        setTimeout(() => {
            animateDetailModeOpen();
            detailModeRef.current?.animateOpen();
        }, 200);

    }

    const capturePosterInitialPosition = async () => {
        containerRef.current?.measure((x, y, width, height, pageX, pageY) => {
            modalAnimationTempLeft = pageX;
            modalAnimationTempTop = pageY;

            modalContainerAnimationLeft.value = pageX + posterWidth + 15
            modalContainerAnimationTop.value = pageY
        });
    }

    const animateDetailModeOpen = () => {
        setIsDetailMode(true);
        setExpanded(true);
        modalAnimationPosition.value = "absolute";

        modalAnimationHeight.value = withTiming(height, { duration: animationDuration });
        modalAnimationWidth.value = withTiming(width, { duration: animationDuration });

        modalContainerAnimationTop.value = withTiming(0, { duration: animationDuration });
        modalContainerAnimationLeft.value = withTiming(0, { duration: animationDuration });

        posterAnimationHeight.value = withTiming(height, { duration: animationDuration });
        posterAnimationWidth.value = withTiming(width, { duration: animationDuration });
    }

    const animateDetailModeClose = () => {
        setTimeout(() => {
            setIsDetailMode(false)
            modalAnimationPosition.value = "relative";
        }, animationDuration - 70);

        modalAnimationHeight.value = withTiming(posterHeight, { duration: animationDuration });
        modalAnimationWidth.value = withTiming(posterWidth, { duration: animationDuration });

        modalContainerAnimationTop.value = withTiming(modalAnimationTempTop, { duration: animationDuration });
        modalContainerAnimationLeft.value = withTiming(modalAnimationTempLeft + posterWidth + 15, { duration: animationDuration });

        posterAnimationHeight.value = withTiming(posterHeight, { duration: animationDuration });
        posterAnimationWidth.value = withTiming(posterWidth, { duration: animationDuration });
    }

    if (isDetailMode) {
        return (
            <>
                <AnimatedModal visible={isDetailMode} style={modalAnimationStyle} transparent animationType="none">
                    <Animated.View style={modalContainerAnimationStyle}>
                        {expanded && <DetailMode
                            content={content}
                            onClose={animateDetailModeClose}
                            collapsibleWidth={posterWidth}
                            collapsibleHeight={posterHeight}
                            animationDuration={animationDuration - 100}
                            ref={detailModeRef}
                        />}
                    </Animated.View>
                </AnimatedModal>
                <View style={styles.container}>
                    <Image source={{ uri: content.poster }} style={styles.poster} resizeMode="cover" />
                </View>
            </>
        )
    }

    return (
        <View style={styles.container} ref={containerRef}>
            <Pressable onPress={posterOnPress}>
                <Animated.Image source={{ uri: content.poster }} style={posterAnimationStyle} resizeMode="stretch" />
            </Pressable>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        height: posterHeight,
        width: posterWidth,
        margin: 5,
    },
    poster: {
        height: posterHeight,
        width: posterWidth,
        borderRadius: 5
    },
    image: {
        height: posterHeight,
        width: posterWidth,
        borderRadius: 5,
    }
});

export default PosterMode;