import { useRef, useState, forwardRef } from 'react'
import { View, Dimensions, Modal, StyleSheet } from "react-native"
import Animated from "react-native-reanimated"
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Constant from 'expo-constants';
import DetailMode from "./contentMode/detailMode"
import AnimationBlur from "./animations/blurAnimation"
import PosterMode from './contentMode/posterMode';
import { BlurView } from 'expo-blur';
import {
    animateDetailContainerStyle,
    animateDetailModeBackgroundBlur,
    animateModalContainerStyle,
    animatePosterBlurStyle,
    animatePosterStyle,
    animationPosterStyle,
    detailContainerStyle,
    detailModeBackgroundBlur,
    modalContainerPan,
    modalContainerStyle,
    posterBlurStyle,
    capturePosterInitialPosition,
    detailModeBackgroundBlurIntensity,
    posterBlurIntensity,
    modalAnimationTempLeft,
    modalAnimationTempTop
} from './animations/animations'

type ContentListRenderItemProps = {
    content: Series | Movie,
}

const { width, height } = Dimensions.get('window');
const posterWidth: number = width / 3.275;
const posterHeight: number = posterWidth * 1.3;
const { statusBarHeight } = Constant;

const ContentListRenderItem = forwardRef(({ content }: ContentListRenderItemProps, ref) => {
    const posterModeContainerRef = useRef<View>({} as View);
    const detailModeScrollViewRef = useRef(null);

    const AnimatedModal = Animated.createAnimatedComponent(Modal);
    const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

    const [isDetailMode, setIsDetailMode] = useState<boolean>(false);

    const posterOnPress = async () => {
        await capturePosterInitialPosition(posterModeContainerRef);
        setIsDetailMode(true);
        animateDetailModeOpen();
    }

    const animateDetailModeOpen = () => {
        animatePosterStyle(0, height, width);
        animatePosterBlurStyle(height, width)
        animateModalContainerStyle(height, width, 0, 0);
        animateDetailContainerStyle(1, statusBarHeight, setIsDetailMode);
        animateDetailModeBackgroundBlur(70, 1);
    }

    const detailModeClose = () => {
        animatePosterStyle(1, posterHeight, posterWidth);
        animatePosterBlurStyle(posterHeight, posterWidth);
        animateModalContainerStyle(posterHeight, posterWidth, modalAnimationTempTop, modalAnimationTempLeft);
        animateDetailContainerStyle(0, 0, setIsDetailMode);
        animateDetailModeBackgroundBlur(0, 0);
    }

    return (
        <>
            {isDetailMode &&
                <AnimatedModal visible={isDetailMode} style={styles.detailModeModal} transparent animationType="none">
                    <AnimatedBlurView style={detailModeBackgroundBlur} intensity={detailModeBackgroundBlurIntensity}>
                        <GestureHandlerRootView style={{ position: "absolute", top: 0, left: 0 }}>
                            <GestureDetector gesture={Gesture.Simultaneous(modalContainerPan(detailModeScrollViewRef, detailModeClose))}>
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