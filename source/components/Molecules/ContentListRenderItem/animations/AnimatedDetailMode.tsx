
import { MutableRefObject, forwardRef, useImperativeHandle, useRef, useState } from "react";
import { View, Modal, StyleSheet } from "react-native"
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated"
import { Gesture, GestureHandlerRootView, GestureDetector } from "react-native-gesture-handler";
import DetailMode from "../contentMode/detailMode";
import useDetailModeAnimations from "./useDetailModeAnimations";
import AnimatedBlur from "./AnimatedBlur";

type AnimatedDetailModeProps = {
    content: Series | Movie
    posterModeContainerRef: MutableRefObject<View>
}

export type AnimatedDetailModeRef = {
    expand: () => void;
}

const AnimatedDetailMode = forwardRef(({ content, posterModeContainerRef }: AnimatedDetailModeProps, ref) => {
    useImperativeHandle(ref, () => ({
        expand
    }));

    const detailModeScrollViewRef = useRef(null);

    const AnimatedModal = Animated.createAnimatedComponent(Modal);
    const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

    const {
        animationPosterStyle,
        collapseDetailMode,
        detailContainerStyle,
        detailModeBackgroundBlur,
        expandDetailMode,
        modalContainerPan,
        modalContainerStyle,
        posterBlurStyle,
        detailModeBackgroundBlurIntensity,
        posterBlurIntensity,
        isDetailModeVisible
    } = useDetailModeAnimations();

    console.log(isDetailModeVisible);

    const expand = () => {
        expandDetailMode(posterModeContainerRef);
    }

    const collapse = () => {
        collapseDetailMode();
    }

    if (!isDetailModeVisible) return;

    return (
        <AnimatedModal visible={isDetailModeVisible} style={styles.detailModeModal} transparent animationType="none">
            <AnimatedBlurView style={detailModeBackgroundBlur} intensity={detailModeBackgroundBlurIntensity}>
                <GestureHandlerRootView style={styles.gesture}>
                    <GestureDetector gesture={Gesture.Simultaneous(modalContainerPan(detailModeScrollViewRef, collapse))}>
                        <Animated.View style={[modalContainerStyle]}>
                            <View style={styles.detailModePoster}>
                                <AnimatedBlur
                                    content={content}
                                    intensity={posterBlurIntensity}
                                    style={posterBlurStyle}
                                    posterStyle={animationPosterStyle}
                                />
                                <DetailMode
                                    scrollViewRef={detailModeScrollViewRef}
                                    content={content}
                                    onClose={collapse}
                                    containerStyle={detailContainerStyle}
                                />
                            </View>
                        </Animated.View>
                    </GestureDetector>
                </GestureHandlerRootView >
            </AnimatedBlurView>
        </AnimatedModal>
    )
})

const styles = StyleSheet.create({
    detailModeModal: {

    },
    detailModePoster: {
        flex: 1,
    },
    gesture: {
        position: "absolute",
        top: 0,
        left: 0
    }
})

export default AnimatedDetailMode;
