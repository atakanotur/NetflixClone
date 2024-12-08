import colors from '@/source/theme/colors';
import responsiveFontSize from '@/source/theme/responsiveFontSize';
import { View, StyleSheet } from 'react-native';
import Svg, {
    LinearGradient,
    Text,
    Defs,
    Stop,
    TSpan
} from 'react-native-svg';

type ContentNumberProps = {
    index: number;
};

const ContentNumber = ({ index }: ContentNumberProps) => {
    const displayNumber = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
    return (
        <Svg style={styles.container}>
            <Defs>
                <LinearGradient id="number" x1="100%" x2="100%" y1="100%" y2="30%" gradientUnits="objectBoundingBox">
                    <Stop stopColor={colors.darkGrey} offset="80%" />
                    <Stop stopColor={colors.black} offset="100%" />
                </LinearGradient>
            </Defs>
            <Text fill="url(#number)">
                <TSpan
                    fontWeight="800"
                    stroke={colors.whiteGrey}
                    strokeWidth={3}
                    fontSize={responsiveFontSize(110)}
                    x="10"
                    dy="80">{displayNumber}</TSpan>
            </Text>
        </Svg >
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: -5,
        left: 0,
    },
    number: {
        fontSize: 100,
        fontWeight: 'bold',
        color: colors.black,
        textShadowColor: colors.white,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
        zIndex: 50,
        elevation: 10
    },
});

export default ContentNumber;
