import { GestureResponderEvent, StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import Text from '../CustomText'

type CustomButtonProps = {
    style?: StyleProp<ViewStyle>
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    title?: string | undefined
    titleStyle?: StyleProp<TextStyle>
    disabled?: boolean | undefined
}

const CustomButton = ({ title, onPress, style, titleStyle, disabled }: CustomButtonProps) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress} disabled={disabled}>
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

export default CustomButton;