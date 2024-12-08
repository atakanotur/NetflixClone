import { forwardRef, useImperativeHandle } from 'react';
import Animated, { Easing, EasingFunction, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import colors from '@/source/theme/colors';

type SelectedCategoryAnimationProps = {
    animationDuration: number,
    height: number
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
            backgroundColor: colors.white,
            width: animatedWidth.value,
            zIndex: -1,
            borderRadius: 20,
            transform: [{ translateX: animatedLeft.value }],
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
        <Animated.View style={[animatedStyle, { height }]} />
    )
})

export default SelectedCategoryAnimation;