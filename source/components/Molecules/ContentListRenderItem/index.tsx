import { useRef } from 'react'
import { View, Dimensions } from "react-native"
import PosterMode from './contentMode/posterMode';
import AnimatedDetailMode, { AnimatedDetailModeRef } from './animations/AnimatedDetailMode';

type ContentListRenderItemProps = {
    content: Series | Movie,
}

const ContentListRenderItem = ({ content }: ContentListRenderItemProps) => {
    const { width, height } = Dimensions.get('window');
    const posterWidth: number = width / 3.275;
    const posterHeight: number = posterWidth * 1.3;

    const animatedDetailModeRef = useRef<AnimatedDetailModeRef>(null)
    const posterModeContainerRef = useRef<View>({} as View);

    const posterOnPress = async () => {
        animatedDetailModeRef.current?.expand();
    }

    return (
        <>
            <AnimatedDetailMode
                ref={animatedDetailModeRef}
                content={content}
                posterModeContainerRef={posterModeContainerRef}
            />
            <PosterMode
                posterModeContainerRef={posterModeContainerRef}
                content={content}
                posterHeight={posterHeight}
                posterWidth={posterWidth}
                posterOnPress={posterOnPress}
            />
        </>
    );
}

export default ContentListRenderItem;