import { StyleProp, Text, StyleSheet, TextStyle, GestureResponderEvent } from 'react-native';
import colors from '@/source/theme/colors';
import responsiveFontSize from '@/source/theme/responsiveFontSize';
import { Key, forwardRef } from 'react';

type CustomTextProps = {
    key?: Key | null | undefined
    text: string | undefined
    style?: StyleProp<TextStyle>
    adjustsFontSizeToFit?: boolean | undefined
    onPress?: ((event: GestureResponderEvent) => void) | undefined
    numberOfLines?: number
}

const CustomText = forwardRef<Text, CustomTextProps>(({ key, text, style, onPress, adjustsFontSizeToFit, numberOfLines }: CustomTextProps, ref) => {
    return <Text key={key} style={[styles.text, style]} adjustsFontSizeToFit={adjustsFontSizeToFit} onPress={onPress} numberOfLines={numberOfLines}>{text}</Text>
});

const styles = StyleSheet.create({
    text: {
        color: colors.white,
        fontSize: responsiveFontSize(20)
    }
});

export default CustomText;