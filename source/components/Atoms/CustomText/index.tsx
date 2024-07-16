import { StyleProp, Text, StyleSheet, TextStyle } from 'react-native';
import colors from '@/source/theme/colors';
import responsiveFontSize from '@/source/theme/responsiveFontSize';

type CustomTextProps = {
    text: string
    style?: StyleProp<TextStyle>
}

const CustomText = ({ text, style }: CustomTextProps) => {
    return <Text style={[styles.text, style]} adjustsFontSizeToFit>{text}</Text>
};

const styles = StyleSheet.create({
    text: {
        color: colors.white,
        fontSize: responsiveFontSize(20)
    }
});

export default CustomText;