import { forwardRef, useState, useRef, useImperativeHandle } from "react"
import { View, Dimensions, Pressable, StyleSheet, Image, Modal } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated"
import DetailMode, { DetailModeRef } from "./detailMode"
import { BlurView } from "expo-blur"

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
    const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

    const [isDetailMode, setIsDetailMode] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);

    const animationDuration: number = 1600;
    const halfAnimationDuration: number = animationDuration / 2;

    const animationDurationAndEasing = {
        duration: animationDuration,
        easing: Easing.out(Easing.exp)
    }

    const halfAnimationDurationAndEasing = {
        duration: halfAnimationDuration,
        easing: Easing.out(Easing.exp)
    }

    //Modal Animation Styles
    const modalAnimationHeight = useSharedValue(posterHeight);
    const modalAnimationWidth = useSharedValue(posterWidth);

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
            zIndex: 1
        }
    });

    //Poster Mode BlurView
    const posterIntensity = useSharedValue(0);
    const posterBlurHeight = useSharedValue(posterHeight);
    const posterBlurWidth = useSharedValue(posterWidth);
    const posterModeBlurView = useAnimatedStyle(() => {
        return {
            position: "absolute",
            width: posterBlurWidth.value,
            height: posterBlurHeight.value,
            zIndex: 2,
            top: 0,
            left: 0
        }
    });

    const [isDetailModeBlurred, setIsDetailModeBlurred] = useState<boolean>(false);
    const detailIntensity = useSharedValue(100);
    const detailBlurHeight = useSharedValue(posterHeight);
    const detailBlurWidth = useSharedValue(posterWidth);
    const detailModeBlurView = useAnimatedStyle(() => {
        return {
            position: "absolute",
            width: detailBlurWidth.value,
            height: detailBlurHeight.value,
            top: 0,
            left: 0,
            zIndex: 5
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
        setIsDetailModeBlurred(true);
        animateDetailModeOpen();
        expandAndAnimateDetailIntensity();
        disableDetailBlurAfterAnimation();
    }

    const animateDetailModeOpen = () => {
        posterIntensity.value = withTiming(100, halfAnimationDurationAndEasing);
        posterBlurHeight.value = withTiming(height, animationDurationAndEasing);
        posterBlurWidth.value = withTiming(width, animationDurationAndEasing);

        detailBlurHeight.value = withTiming(height, animationDurationAndEasing);
        detailBlurWidth.value = withTiming(width, animationDurationAndEasing);

        modalAnimationHeight.value = withTiming(height, animationDurationAndEasing);
        modalAnimationWidth.value = withTiming(width, animationDurationAndEasing);

        modalContainerAnimationTop.value = withTiming(0, animationDurationAndEasing);
        modalContainerAnimationLeft.value = withTiming(0, animationDurationAndEasing);

        posterAnimationHeight.value = withTiming(height, animationDurationAndEasing);
        posterAnimationWidth.value = withTiming(width, animationDurationAndEasing);
    }

    const expandAndAnimateDetailIntensity = () => {
        setTimeout(() => {
            setExpanded(true);
            detailIntensity.value = withTiming(0, { duration: animationDuration / 2 });
        }, halfAnimationDuration);
    }

    const disableDetailBlurAfterAnimation = () => {
        setTimeout(() => {
            setIsDetailModeBlurred(false);

        }, animationDuration);
    }

    const detailModeClose = () => {
        setIsDetailModeBlurred(true);
        animateDetailModeClose();
        disableDetailModeAndBlur();
        collapseDetailMode();
    }

    const animateDetailModeClose = () => {
        posterIntensity.value = withTiming(0, animationDurationAndEasing);
        posterBlurHeight.value = withTiming(posterHeight, animationDurationAndEasing);
        posterBlurWidth.value = withTiming(posterWidth, animationDurationAndEasing);

        detailIntensity.value = withTiming(100, halfAnimationDurationAndEasing);
        detailBlurHeight.value = withTiming(posterHeight, animationDurationAndEasing);
        detailBlurWidth.value = withTiming(posterWidth, animationDurationAndEasing);

        modalAnimationHeight.value = withTiming(posterHeight, animationDurationAndEasing);
        modalAnimationWidth.value = withTiming(posterWidth, animationDurationAndEasing);

        modalContainerAnimationTop.value = withTiming(modalAnimationTempTop, animationDurationAndEasing);
        modalContainerAnimationLeft.value = withTiming(modalAnimationTempLeft + posterWidth + 15, animationDurationAndEasing);

        posterAnimationHeight.value = withTiming(posterHeight, animationDurationAndEasing);
        posterAnimationWidth.value = withTiming(posterWidth, animationDurationAndEasing);
    }

    const disableDetailModeAndBlur = () => {
        setTimeout(() => {
            setIsDetailMode(false)
            setIsDetailModeBlurred(false);
        }, animationDuration);
    }

    const collapseDetailMode = () => {
        setTimeout(() => {
            setExpanded(false);
        }, halfAnimationDuration);
    }

    if (isDetailMode) {
        return (
            <>
                <AnimatedModal visible={isDetailMode} style={modalAnimationStyle} transparent animationType="none">
                    <Animated.View style={modalContainerAnimationStyle}>
                        {expanded ?
                            <View style={styles.expandedDetailContainer}>
                                {isDetailModeBlurred && <AnimatedBlurView intensity={detailIntensity} style={detailModeBlurView} />}
                                <DetailMode
                                    content={content}
                                    onClose={detailModeClose}
                                    ref={detailModeRef}
                                />
                            </View>
                            :
                            <>
                                <AnimatedBlurView intensity={posterIntensity} style={posterModeBlurView} />
                                <Animated.Image source={{ uri: content.poster }} style={posterAnimationStyle} />
                            </>
                        }
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