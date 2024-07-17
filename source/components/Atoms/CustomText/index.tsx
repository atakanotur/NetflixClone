import { StyleProp, Text, StyleSheet, TextStyle, GestureResponderEvent } from 'react-native';
import colors from '@/source/theme/colors';
import responsiveFontSize from '@/source/theme/responsiveFontSize';

type CustomTextProps = {
    text: string | undefined
    style?: StyleProp<TextStyle>
    adjustsFontSizeToFit?: boolean | undefined
    onPress?: ((event: GestureResponderEvent) => void) | undefined
}

const CustomText = ({ text, style, onPress, adjustsFontSizeToFit }: CustomTextProps) => {
    return <Text style={[styles.text, style]} adjustsFontSizeToFit={adjustsFontSizeToFit} onPress={onPress}>{text}</Text>
};

const styles = StyleSheet.create({
    text: {
        color: colors.white,
        fontSize: responsiveFontSize(20)
    }
});

export default CustomText;