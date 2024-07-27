import { TextInput, StyleSheet, StyleProp, TextStyle, NativeSyntheticEvent, TextInputFocusEventData, ColorValue, TextInputSelectionChangeEventData, KeyboardTypeOptions } from "react-native";

type CustomTextInputProps = {
    ref?: React.LegacyRef<TextInput> | undefined
    style?: StyleProp<TextStyle>
    onChangeText?: ((text: string) => void)
    value?: string
    onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    placeholder?: string
    secureTextEntry?: boolean
    placeholderTextColor?: ColorValue
    onSelectionChange?: ((e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void)
    selection?: { start: number; end?: number | undefined }
    onFocus?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    maxLength?: number
    keyboardType?: KeyboardTypeOptions
}

const CustomTextInput = ({ ref, style, onChangeText, value, onBlur, placeholder, placeholderTextColor, secureTextEntry, onSelectionChange, selection, onFocus, maxLength, keyboardType }: CustomTextInputProps) => {
    return <TextInput
        ref={ref}
        style={[styles.input, style]}
        onChangeText={onChangeText}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        onSelectionChange={onSelectionChange}
        selection={selection}
        selectionColor={"#fff"}
        onFocus={onFocus}
        maxLength={maxLength}
        keyboardType={keyboardType} />
}

const styles = StyleSheet.create({
    input: {}
})

export default CustomTextInput;