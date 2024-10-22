import { ImageStyle, StyleProp, ViewStyle } from 'react-native';
import Animated, { AnimatedStyle, SharedValue } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

type AnimationBlurType = {
    content: Series | Movie
    intensity?: SharedValue<number>
    style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>
    imageStyle?: StyleProp<AnimatedStyle<StyleProp<ImageStyle>>>
}

const AnimationBlur = ({ content, intensity, style, imageStyle }: AnimationBlurType) => {
    const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

    return (
        <>
            <AnimatedBlurView intensity={intensity} style={style} />
            <Animated.Image source={{ uri: content.poster }} style={imageStyle} />
        </>
    )
}

export default AnimationBlur;