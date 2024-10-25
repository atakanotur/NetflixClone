import { Dispatch, SetStateAction, MutableRefObject } from 'react'
import { Dimensions, View } from 'react-native';
import { useSharedValue, useAnimatedStyle, withTiming, withSequence, runOnJS, interpolateColor, Easing } from 'react-native-reanimated'
import { Gesture } from 'react-native-gesture-handler';
import { captureViewPosition } from '@/source/lib/captureViewPositions';

const { height, width } = Dimensions.get("window");
const posterWidth: number = width / 3.275;
const posterHeight: number = posterWidth * 1.3;
export let modalAnimationTempLeft = 0;
export let modalAnimationTempTop = 0;

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

export const detailModeBackgroundBlurIntensity = useSharedValue(0);
const detailModeBackgoundBlurColorProgress = useSharedValue(0);
export const detailModeBackgroundBlur = useAnimatedStyle(() => {
    return {
        flex: 1,
        backgroundColor: interpolateColor(detailModeBackgoundBlurColorProgress.value, [0, 1], ["transparent", "black"])
    }
})
export const animateDetailModeBackgroundBlur = (intensity: number, backgroundColorProgress: number) => {
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
export const modalContainerStyle = useAnimatedStyle(() => {
    return {
        height: modalContainerHeight.value,
        width: modalContainerWidth.value,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ translateX: modalContainerTranslateX.value }, { translateY: modalContainerTranslateY.value }]
    }
})
export const animateModalContainerStyle = (height: number, width: number, top: number, left: number) => {
    modalContainerHeight.value = withTiming(height, animationDurationAndEasing);
    modalContainerWidth.value = withTiming(width, animationDurationAndEasing);
    modalContainerTranslateY.value = withTiming(top, animationDurationAndEasing);
    modalContainerTranslateX.value = withTiming(left, animationDurationAndEasing);
}

export const modalContainerPan = (detailModeScrollViewRef: React.MutableRefObject<null>, detailModeClose: () => void) => {
    const clamp = (val: number, min: number, max: number) => {
        return Math.min(Math.max(val, min), max);
    }
    return Gesture.Pan()
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
}

//Poster Animation Styles
const animationPosterOpacity = useSharedValue(1);
const animationPosterHeight = useSharedValue(posterHeight);
const animationPosterWidth = useSharedValue(posterWidth);
export const animationPosterStyle = useAnimatedStyle(() => {
    return {
        position: 'absolute',
        height: animationPosterHeight.value,
        width: animationPosterWidth.value,
        zIndex: 1,
        opacity: animationPosterOpacity.value,
        borderRadius: 5
    }
});
export const animatePosterStyle = (opacity: number, height: number, width: number) => {
    animationPosterOpacity.value = withTiming(opacity, animationDurationAndEasing);
    animationPosterHeight.value = withTiming(height, animationDurationAndEasing);
    animationPosterWidth.value = withTiming(width, animationDurationAndEasing);
}

//Poster Blur Animation Styles
export const posterBlurIntensity = useSharedValue(100);
const posterBlurHeight = useSharedValue(posterHeight);
const posterBlurWidth = useSharedValue(posterWidth);
export const posterBlurStyle = useAnimatedStyle(() => {
    return {
        position: 'absolute',
        height: posterBlurHeight.value,
        width: posterBlurWidth.value,
        zIndex: 2,
        borderRadius: 5
    }
})
export const animatePosterBlurStyle = (height: number, width: number) => {
    posterBlurHeight.value = withTiming(height, animationDurationAndEasing)
    posterBlurWidth.value = withTiming(width, animationDurationAndEasing)
    posterBlurIntensity.value = withSequence(withTiming(100, halfAnimationDurationAndEasing), withTiming(0, halfAnimationDurationAndEasing))
}

//Detail Container Animation Styles
const detailContainerOpacity = useSharedValue(0);
const detailContainerPaddingTop = useSharedValue(0);
export const detailContainerStyle = useAnimatedStyle(() => {
    return {
        flex: 1,
        paddingTop: detailContainerPaddingTop.value,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        opacity: detailContainerOpacity.value,
        zIndex: 3
    }
})
export const animateDetailContainerStyle = (opacity: number, paddingTop: number, setIsDetailMode: Dispatch<SetStateAction<boolean>>) => {
    detailContainerOpacity.value = withTiming(opacity, animationDurationAndEasing);
    detailContainerPaddingTop.value = withTiming(paddingTop, animationDurationAndEasing, () => {
        if (opacity === 0 || paddingTop === 0) runOnJS(setIsDetailMode)(false)
    });
}

export const capturePosterInitialPosition = async (posterModeContainerRef: MutableRefObject<View>) => {
    const { pageX, pageY } = await captureViewPosition(posterModeContainerRef);
    modalAnimationTempLeft = pageX;
    modalAnimationTempTop = pageY;
    modalContainerTranslateX.value = pageX;
    modalContainerTranslateY.value = pageY;
}

