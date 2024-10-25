import { ImageStyle, StyleProp, ViewStyle } from 'react-native';
import Animated, { AnimatedStyle, SharedValue } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

type AnimationBlurType = {
    content: Series | Movie
    intensity?: SharedValue<number>
    style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
    posterStyle?: StyleProp<AnimatedStyle<StyleProp<ImageStyle>>>
}

const BlurAnimation = ({ content, intensity, style, posterStyle }: AnimationBlurType) => {
    const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

    return (
        <>
            <AnimatedBlurView intensity={intensity} style={style} />
            <Animated.Image source={{ uri: content.poster }} style={posterStyle} resizeMode="stretch" />
        </>
    )
}

export default BlurAnimation;