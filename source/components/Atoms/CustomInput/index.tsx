import { TextInput, StyleSheet, StyleProp, TextStyle, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

type CustomTextInputProps = {
    style?: StyleProp<TextStyle>
    onChangeText?: ((text: string) => void)
    value?: string
    onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    placeholder?: string
    secureTextEntry?: boolean
}

const CustomTextInput = ({ style, onChangeText, value, onBlur, placeholder, secureTextEntry }: CustomTextInputProps) => {
    return <TextInput
        style={[styles.input, style]}
        onChangeText={onChangeText}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry} />
}

const styles = StyleSheet.create({
    input: {}
})

export default CustomTextInput;