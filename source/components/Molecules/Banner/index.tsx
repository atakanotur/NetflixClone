import { View, StyleSheet } from 'react-native';
import { Text } from "../../Atoms";
import { StatusBar } from 'expo-status-bar';
import colors from '@/source/theme/colors';
import localization from '@/source/lib/locales/localization';

type BannerProps = {
    name: string
}

const Banner = ({ name }: BannerProps) => {
    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor='rgba(0,0,0,1)' />
            <Text text={name + " " + localization.t("for")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
});

export default Banner