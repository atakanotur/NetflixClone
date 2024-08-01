import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from './styles';
import { router } from 'expo-router';

const Loading = () => {

    useEffect(() => {
        setTimeout(() => {
            router.replace({ pathname: "/landing" })
        }, 1000)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator size={"large"} />
        </SafeAreaView>
    )
}

export default Loading;