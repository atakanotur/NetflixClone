import { forwardRef, useState, useRef, useImperativeHandle } from "react"
import { View, Dimensions, Pressable, StyleSheet, Image, Modal } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withSequence } from "react-native-reanimated"
import DetailMode, { DetailModeRef } from "./detailMode"
import AnimationBlur from "./animationBlur"

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
        detailModeClose
    }));

    const AnimatedModal = Animated.createAnimatedComponent(Modal);

    const [isDetailMode, setIsDetailMode] = useState<boolean>(false);

    const animationDuration: number = 500;
    const halfAnimationDuration: number = animationDuration / 2;

    const animationDurationAndEasing = {
        duration: animationDuration,
        easing: Easing.out(Easing.ease)
    }

    const halfAnimationDurationAndEasing = {
        duration: halfAnimationDuration,
        easing: Easing.out(Easing.ease)
    }

    //Modal Animation Styles
    const modalAnimationStyle = useAnimatedStyle(() => {
        return {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5
        }
    });

    //Modal Container Animation Styles
    const modalContainerAnimationLeft = useSharedValue(0);
    const modalContainerAnimationTop = useSharedValue(0);

    const modalContainerAnimationHeight = useSharedValue(posterHeight);
    const modalContainerAnimationWidth = useSharedValue(posterWidth);

    const modalContainerAnimationStyle = useAnimatedStyle(() => {
        return {
            height: modalContainerAnimationHeight.value,
            width: modalContainerAnimationWidth.value,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ translateX: modalContainerAnimationLeft.value }, { translateY: modalContainerAnimationTop.value }]
        }
    })

    //Poster Animation Styles
    const posterAnimationStyle = useAnimatedStyle(() => {
        return {
            flex: 1,
            borderRadius: 5,
            zIndex: 1,
        }
    });

    const animationPosterOpacity = useSharedValue(1);
    const animationPosterHeight = useSharedValue(posterHeight);
    const animationPosterWidth = useSharedValue(posterWidth);
    const animationPosterStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            height: animationPosterHeight.value,
            width: animationPosterWidth.value,
            zIndex: 1,
            opacity: animationPosterOpacity.value
        }
    });

    const posterBlurIntensity = useSharedValue(100);
    const posterBlurHeight = useSharedValue(posterHeight);
    const posterBlurWidth = useSharedValue(posterWidth);
    const posterBlurStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            height: posterBlurHeight.value,
            width: posterBlurWidth.value,
            zIndex: 2
        }
    })

    const posterOnPress = () => {
        triggerAnimateDetailModeOpen();
        capturePosterInitialPosition();
    }

    const triggerAnimateDetailModeOpen = () => {
        setTimeout(() => {
            detailModeOpen();
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

    const detailModeOpen = () => {
        setIsDetailMode(true);
        animateDetailModeOpen();
    };

    const animateDetailModeOpen = () => {
        detailModeRef.current?.animateOpen();

        posterOpenAnimations();
        posterBlurOpenAnimations();
        modalContainerOpenAnimations();
    }

    const posterOpenAnimations = () => {
        animationPosterHeight.value = withTiming(height, animationDurationAndEasing)
        animationPosterWidth.value = withTiming(width, animationDurationAndEasing)
        animationPosterOpacity.value = withTiming(0, animationDurationAndEasing)
    }

    const posterBlurOpenAnimations = () => {
        posterBlurHeight.value = withTiming(height, animationDurationAndEasing)
        posterBlurWidth.value = withTiming(width, animationDurationAndEasing)
        animateBlurSequence();
    }

    const modalContainerOpenAnimations = () => {
        modalContainerAnimationHeight.value = withTiming(height, animationDurationAndEasing);
        modalContainerAnimationWidth.value = withTiming(width, animationDurationAndEasing);
        modalContainerAnimationTop.value = withTiming(0, animationDurationAndEasing);
        modalContainerAnimationLeft.value = withTiming(0, animationDurationAndEasing);
    }

    const detailModeClose = () => {
        animateDetailModeClose();
        disableDetailMode();
    }

    const animateDetailModeClose = () => {
        posterCloseAnimations();
        posterBlurCloseAnimations();
        modalContainerCloseAnimations();
    }

    const posterCloseAnimations = () => {
        animationPosterHeight.value = withTiming(posterHeight, animationDurationAndEasing)
        animationPosterWidth.value = withTiming(posterWidth, animationDurationAndEasing)
        animationPosterOpacity.value = withTiming(1, animationDurationAndEasing)
    }

    const posterBlurCloseAnimations = () => {
        posterBlurHeight.value = withTiming(posterHeight, animationDurationAndEasing)
        posterBlurWidth.value = withTiming(posterWidth, animationDurationAndEasing)
        animateBlurSequence();
    }

    const modalContainerCloseAnimations = () => {
        modalContainerAnimationHeight.value = withTiming(posterHeight, animationDurationAndEasing);
        modalContainerAnimationWidth.value = withTiming(posterWidth, animationDurationAndEasing);
        modalContainerAnimationTop.value = withTiming(modalAnimationTempTop, animationDurationAndEasing);
        modalContainerAnimationLeft.value = withTiming(modalAnimationTempLeft, animationDurationAndEasing);
    }

    const disableDetailMode = () => {
        setTimeout(() => {
            setIsDetailMode(false)
        }, animationDuration);
    }

    const animateBlurSequence = () => {
        posterBlurIntensity.value = withSequence(withTiming(100, halfAnimationDurationAndEasing), withTiming(0, halfAnimationDurationAndEasing))
    }

    if (isDetailMode) {
        return (
            <>
                <AnimatedModal visible={isDetailMode} style={modalAnimationStyle} transparent animationType="none">
                    <Animated.View style={modalContainerAnimationStyle}>
                        <Animated.View style={posterAnimationStyle}>
                            <AnimationBlur
                                content={content}
                                intensity={posterBlurIntensity}
                                style={posterBlurStyle}
                                imageStyle={animationPosterStyle}
                            />
                            <DetailMode
                                ref={detailModeRef}
                                content={content}
                                onClose={detailModeClose}
                            />
                        </Animated.View>
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
                <Image source={{ uri: content.poster }} style={styles.poster} resizeMode="stretch" />
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
    },
    expandedDetailContainer: {
        flex: 1,
    }
});

export default PosterMode;