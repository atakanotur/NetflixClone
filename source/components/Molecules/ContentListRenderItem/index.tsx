import { useRef, useState, forwardRef } from 'react'
import { View, Dimensions, Modal, StyleSheet } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withSequence, runOnJS, interpolateColor } from "react-native-reanimated"
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Constant from 'expo-constants';
import DetailMode from "./detailMode"
import AnimationBlur from "./animationBlur"
import PosterMode from './posterMode';
import { BlurView } from 'expo-blur';

type ContentListRenderItemProps = {
    content: Series | Movie,
}

function clamp(val: number, min: number, max: number) {
    return Math.min(Math.max(val, min), max);
}

const { width, height } = Dimensions.get('window');
const posterWidth: number = width / 3.275;
const posterHeight: number = posterWidth * 1.3;
let modalAnimationTempLeft = 0;
let modalAnimationTempTop = 0;
const { statusBarHeight } = Constant;

const ContentListRenderItem = forwardRef(({ content }: ContentListRenderItemProps, ref) => {
    const posterModeContainerRef = useRef<View>({} as View);
    const detailModeScrollViewRef = useRef(null);

    const AnimatedModal = Animated.createAnimatedComponent(Modal);
    const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

    const [isDetailMode, setIsDetailMode] = useState<boolean>(false);

    const animationDuration: number = 500;
    const halfAnimationDuration: number = animationDuration / 2;
    const animationDurationAndEasing = {
        duration: animationDuration,
        easing: Easing.inOut(Easing.exp)
    }
    const halfAnimationDurationAndEasing = {
        duration: halfAnimationDuration,
        easing: Easing.inOut(Easing.exp)
    }

    //Detail Mode Background Blur
    const detailModeBackgroundBlurIntensity = useSharedValue(0);
    const detailModeBackgoundBlurColorProgress = useSharedValue(0);
    const detailModeBackgroundBlur = useAnimatedStyle(() => {
        return {
            flex: 1,
            backgroundColor: interpolateColor(detailModeBackgoundBlurColorProgress.value, [0, 1], ["transparent", "black"])
        }
    })
    const animateDetailModeBackgroundBlur = (intensity: number, backgroundColorProgress: number) => {
        detailModeBackgroundBlurIntensity.value = withTiming(intensity, halfAnimationDurationAndEasing);
        detailModeBackgoundBlurColorProgress.value = withTiming(backgroundColorProgress, halfAnimationDurationAndEasing);
    }

    //Modal Container Animation Styles
    const modalContainerTranslateX = useSharedValue(0);
    const modalContainerTranslateY = useSharedValue(0);
    const modalContainerPrevTranslationX = useSharedValue(0);
    const modalContainerPrevTranslationY = useSharedValue(0);
    const modalContainerHeight = useSharedValue(posterHeight);
    const modalContainerWidth = useSharedValue(posterWidth);
    const modalContainerStyle = useAnimatedStyle(() => {
        return {
            height: modalContainerHeight.value,
            width: modalContainerWidth.value,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ translateX: modalContainerTranslateX.value }, { translateY: modalContainerTranslateY.value }]
        }
    })
    const animateModalContainerStyle = (height: number, width: number, top: number, left: number) => {
        modalContainerHeight.value = withTiming(height, animationDurationAndEasing);
        modalContainerWidth.value = withTiming(width, animationDurationAndEasing);
        modalContainerTranslateY.value = withTiming(top, animationDurationAndEasing);
        modalContainerTranslateX.value = withTiming(left, animationDurationAndEasing);
    }
    const modalContainerPan = Gesture.Pan()
        .minDistance(2)
        .simultaneousWithExternalGesture(detailModeScrollViewRef)
        .onStart(() => {
            modalContainerPrevTranslationX.value = modalContainerTranslateX.value;
            modalContainerPrevTranslationY.value = modalContainerTranslateY.value;
            animateDetailModeBackgroundBlur(70, 0);
        })
        .onUpdate((event) => {
            const maxTranslateX = width;
            const maxTranslateY = height;
            modalContainerTranslateX.value = clamp(modalContainerPrevTranslationX.value + event.translationX, -maxTranslateX, maxTranslateX);
            modalContainerTranslateY.value = clamp(modalContainerPrevTranslationY.value + event.translationY, -maxTranslateY, maxTranslateY);
        }).onEnd((event) => {
            if ((event.translationX > 50 || event.translationX < -50) && (event.translationY > 50 || event.translationY < -50)) detailModeClose();
            else {
                animateDetailModeBackgroundBlur(70, 1);
                modalContainerTranslateX.value = withTiming(0, halfAnimationDurationAndEasing)
                modalContainerTranslateY.value = withTiming(0, halfAnimationDurationAndEasing)
            }
        })
        .runOnJS(true);

    //Poster Animation Styles
    const animationPosterOpacity = useSharedValue(1);
    const animationPosterHeight = useSharedValue(posterHeight);
    const animationPosterWidth = useSharedValue(posterWidth);
    const animationPosterStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            height: animationPosterHeight.value,
            width: animationPosterWidth.value,
            zIndex: 1,
            opacity: animationPosterOpacity.value,
            borderRadius: 5
        }
    });
    const animatePosterStyle = (opacity: number, height: number, width: number) => {
        animationPosterOpacity.value = withTiming(opacity, animationDurationAndEasing);
        animationPosterHeight.value = withTiming(height, animationDurationAndEasing);
        animationPosterWidth.value = withTiming(width, animationDurationAndEasing);
    }

    //Poster Blur Animation Styles
    const posterBlurIntensity = useSharedValue(100);
    const posterBlurHeight = useSharedValue(posterHeight);
    const posterBlurWidth = useSharedValue(posterWidth);
    const posterBlurStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            height: posterBlurHeight.value,
            width: posterBlurWidth.value,
            zIndex: 2,
            borderRadius: 5
        }
    })
    const animatePosterBlurStyle = (height: number, width: number) => {
        posterBlurHeight.value = withTiming(height, animationDurationAndEasing)
        posterBlurWidth.value = withTiming(width, animationDurationAndEasing)
        posterBlurIntensity.value = withSequence(withTiming(100, halfAnimationDurationAndEasing), withTiming(0, halfAnimationDurationAndEasing))
    }

    //Detail Container Animation Styles
    const detailContainerOpacity = useSharedValue(0);
    const detailContainerPaddingTop = useSharedValue(0);
    const detailContainerStyle = useAnimatedStyle(() => {
        return {
            flex: 1,
            paddingTop: detailContainerPaddingTop.value,
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            opacity: detailContainerOpacity.value,
            zIndex: 3
        }
    })
    const animateDetailContainerStyle = (opacity: number, paddingTop: number) => {
        detailContainerOpacity.value = withTiming(opacity, animationDurationAndEasing);
        detailContainerPaddingTop.value = withTiming(paddingTop, animationDurationAndEasing, () => {
            if (opacity === 0 || paddingTop === 0) runOnJS(setIsDetailMode)(false)
        });
    }

    const posterOnPress = async () => {
        await capturePosterInitialPosition();
        setIsDetailMode(true);
        animateDetailModeOpen();
    }

    const capturePosterInitialPosition = (): Promise<void> => {
        return new Promise((resolve) => {
            posterModeContainerRef.current?.measure((x, y, width, height, pageX, pageY) => {
                modalAnimationTempLeft = pageX;
                modalAnimationTempTop = pageY;
                modalContainerTranslateX.value = pageX;
                modalContainerTranslateY.value = pageY;
                resolve();
            });
        });
    }

    const animateDetailModeOpen = () => {
        animatePosterStyle(0, height, width);
        animatePosterBlurStyle(height, width)
        animateModalContainerStyle(height, width, 0, 0);
        animateDetailContainerStyle(1, statusBarHeight);
        animateDetailModeBackgroundBlur(70, 1);
    }

    const detailModeClose = () => {
        animatePosterStyle(1, posterHeight, posterWidth);
        animatePosterBlurStyle(posterHeight, posterWidth);
        animateModalContainerStyle(posterHeight, posterWidth, modalAnimationTempTop, modalAnimationTempLeft);
        animateDetailContainerStyle(0, 0);
        animateDetailModeBackgroundBlur(0, 0);
    }

    return (
        <>
            {isDetailMode &&
                <AnimatedModal visible={isDetailMode} style={styles.detailModeModal} transparent animationType="none">
                    <AnimatedBlurView style={detailModeBackgroundBlur} intensity={detailModeBackgroundBlurIntensity}>
                        <GestureHandlerRootView style={{ position: "absolute", top: 0, left: 0 }}>
                            <GestureDetector gesture={Gesture.Simultaneous(modalContainerPan)}>
                                <Animated.View style={[modalContainerStyle]}>
                                    <View style={styles.detailModePoster}>
                                        <AnimationBlur
                                            content={content}
                                            intensity={posterBlurIntensity}
                                            style={posterBlurStyle}
                                            posterStyle={animationPosterStyle}
                                        />
                                        <DetailMode
                                            scrollViewRef={detailModeScrollViewRef}
                                            content={content}
                                            onClose={detailModeClose}
                                            containerStyle={detailContainerStyle}
                                        />
                                    </View>
                                </Animated.View>
                            </GestureDetector>
                        </GestureHandlerRootView >
                    </AnimatedBlurView>
                </AnimatedModal>
            }
            <PosterMode
                posterModeContainerRef={posterModeContainerRef}
                content={content}
                posterHeight={posterHeight}
                posterWidth={posterWidth}
                posterOnPress={posterOnPress}
            />
        </>
    );
})

const styles = StyleSheet.create({
    detailModeModal: {
    },
    detailModePoster: {
        flex: 1,
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: '#b58df1',
        borderRadius: 20,
        zIndex: 9
    },
})

export default ContentListRenderItem;