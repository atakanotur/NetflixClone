import { GestureResponderEvent, StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { Text } from '..'

type CustomButtonProps = {
    style?: StyleProp<ViewStyle>
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    title?: string | undefined
    titleStyle?: StyleProp<TextStyle>
}

const CustomButton = ({ title, onPress, style, titleStyle }: CustomButtonProps) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <Text text={title} style={[styles.text, titleStyle]} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    text: {

    }
});

export default CustomButton