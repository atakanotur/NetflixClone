import { useEffect } from "react";
import { StyleSheet } from "react-native";
import colors from "@/source/theme/colors";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";


type RedBarAnimationProps = {
    isSelected: boolean,
    width: number
}

const RedBarAnimation = ({ isSelected, width }: RedBarAnimationProps) => {
    const barWidth = useSharedValue(0);

    useEffect(() => {
        isSelected ? barWidth.value = withTiming(width) : barWidth.value = withTiming(0);
    }, [isSelected, width]);

    return (
        <Animated.View style={[styles.container, { width: barWidth }]} />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.red,
        height: 5,
        marginBottom: 10
    }
})

export default RedBarAnimation;