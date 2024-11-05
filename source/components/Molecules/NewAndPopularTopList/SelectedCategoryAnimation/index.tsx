import colors from '@/source/theme/colors';
import { forwardRef, useImperativeHandle } from 'react';
import Animated, { Easing, EasingFunction, WithTimingConfig, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type SelectedCategoryAnimationProps = {
    animationDuration: number,
    height?: number | null
}

export type SelectedCategoryAnimationRef = {
    moveCategoryIndicator: (pageX: number, width: number) => Promise<void>
    scrollCategoryIndicator: (pageX: number) => Promise<void>
}

const SelectedCategoryAnimation = forwardRef(({ animationDuration, height }: SelectedCategoryAnimationProps, ref) => {
    useImperativeHandle(ref, () => ({
        moveCategoryIndicator,
        scrollCategoryIndicator
    }));

    const durationAndEasing: { duration: number, easing?: EasingFunction } = {
        duration: animationDuration,
        easing: Easing.circle
    }

    const animatedLeft = useSharedValue(0);
    const animatedWidth = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            position: "absolute",
            top: 10,
            left: animatedLeft.value,
            backgroundColor: colors.white,
            height: height || 40,
            width: animatedWidth.value,
            borderRadius: 20,
            zIndex: -1
        }
    });
    const animatePositionX = (pageX: number) => {
        animatedLeft.value = withTiming(pageX, durationAndEasing);
    };

    const animateWidth = (width: number) => {
        animatedWidth.value = withTiming(width, durationAndEasing)
    }

    const moveCategoryIndicator = (pageX: number, width: number) => {
        animatePositionX(pageX);
        animateWidth(width);
    }

    const scrollCategoryIndicator = (pageX: number) => {
        animatedLeft.value = pageX;
    }
   
    return (
        <Animated.View style={animatedStyle} />
    )
})

export default SelectedCategoryAnimation;