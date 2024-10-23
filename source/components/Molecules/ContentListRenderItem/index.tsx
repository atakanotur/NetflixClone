import { useRef, useState, useImperativeHandle, forwardRef } from 'react'
import { View, Dimensions, Modal, StyleSheet } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, withSequence, withDelay, SharedValue, runOnJS, AnimationCallback } from "react-native-reanimated"
import Constant from 'expo-constants';
import DetailMode from "./detailMode"
import AnimationBlur from "./animationBlur"
import PosterMode from './posterMode';

type ContentListRenderItemProps = {
    content: Series | Movie,
}

const { width, height } = Dimensions.get('window');
const posterWidth: number = width / 3.275;
const posterHeight: number = posterWidth * 1.3;
let modalAnimationTempLeft = 0;
let modalAnimationTempTop = 0;
const { statusBarHeight } = Constant;

const ContentListRenderItem = forwardRef(({ content }: ContentListRenderItemProps, ref) => {
    useImperativeHandle(ref, () => ({
        detailModeClose
    }));
    const posterModeContainerRef = useRef<View>({} as View);

    const AnimatedModal = Animated.createAnimatedComponent(Modal);

    const [isDetailMode, setIsDetailMode] = useState<boolean>(false);

    const animationDuration: number = 1500;
    const halfAnimationDuration: number = animationDuration / 2;
    const animationDurationAndEasing = {
        duration: animationDuration,
        easing: Easing.inOut(Easing.ease)
    }
    const halfAnimationDurationAndEasing = {
        duration: halfAnimationDuration,
        easing: Easing.inOut(Easing.ease)
    }

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
    const animateModalContainerStyle = (height: number, width: number, top: number, left: number) => {
        modalContainerAnimationHeight.value = withTiming(height, animationDurationAndEasing);
        modalContainerAnimationWidth.value = withTiming(width, animationDurationAndEasing);
        modalContainerAnimationTop.value = withTiming(top, animationDurationAndEasing);
        modalContainerAnimationLeft.value = withTiming(left, animationDurationAndEasing);
    }

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
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
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
                modalContainerAnimationLeft.value = pageX + posterWidth + 15;
                modalContainerAnimationTop.value = pageY;
                resolve();
            });
        });
    }

    const animateDetailModeOpen = () => {
        animatePosterStyle(0, height, width);
        animatePosterBlurStyle(height, width)
        animateModalContainerStyle(height, width, 0, 0);
        animateDetailContainerStyle(1, statusBarHeight);
    }

    const detailModeClose = () => {
        animatePosterStyle(1, posterHeight, posterWidth);
        animatePosterBlurStyle(posterHeight, posterWidth);
        animateModalContainerStyle(posterHeight, posterWidth, modalAnimationTempTop, modalAnimationTempLeft);
        animateDetailContainerStyle(0, 0);
    }

    return (
        <>
            {isDetailMode &&
                <AnimatedModal visible={isDetailMode} style={styles.detailModeModal} transparent animationType="none">
                    <Animated.View style={modalContainerAnimationStyle}>
                        <View style={styles.detailModePoster}>
                            <AnimationBlur
                                content={content}
                                intensity={posterBlurIntensity}
                                style={posterBlurStyle}
                                posterStyle={animationPosterStyle}
                            />
                            <DetailMode
                                content={content}
                                onClose={detailModeClose}
                                containerStyle={detailContainerStyle}
                            />
                        </View>
                    </Animated.View>
                </AnimatedModal>}
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailModePoster: {
        flex: 1
    }
})

export default ContentListRenderItem;