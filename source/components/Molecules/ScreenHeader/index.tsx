import { StyleSheet, View } from 'react-native';
import { Text } from '../../Atoms';
import colors from '@/source/theme/colors';
import responsiveFontSize from '@/source/theme/responsiveFontSize';
import { MaterialIcons, Octicons, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type ScreenHeaderProps = {
    screenName: string
}

const ScreenHeader = ({ screenName }: ScreenHeaderProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.screenName}>
                <Text text={screenName} style={styles.screenNameText} />
            </View>
            <View style={styles.icons}>
                <MaterialIcons name="cast" size={responsiveFontSize(30)} color={colors.white} style={styles.icon} />
                <Octicons name="download" size={responsiveFontSize(30)} color={colors.white} style={styles.icon} onPress={() => router.push({ pathname: "/downloads" })} />
                <Ionicons name="search" size={responsiveFontSize(30)} color={colors.white} style={styles.icon} onPress={() => router.push({ pathname: "/search" })} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    screenName: {
        justifyContent: 'center'
    },
    screenNameText: {
        fontSize: responsiveFontSize(25),
        fontWeight: '600',
    },
    icons: {
        flexDirection: 'row',
        padding: 5
    },
    icon: {
        marginLeft: 25
    }
})

export default ScreenHeader;