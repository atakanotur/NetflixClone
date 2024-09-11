import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from './styles';
import { router } from 'expo-router';
import userStore from '@/source/store/userStore';
import user from '@/source/data/user';
import { Host } from 'react-native-portalize';

const Loading = () => {
    const setUser = userStore((state) => state.setUser)
    useEffect(() => {
        setUser(user);
        setTimeout(() => {
            router.replace({ pathname: "/landing" })
        }, 1000)
    }, []);

    return (
        <Host>
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size={"large"} />
            </SafeAreaView>
        </Host>
    )
}

export default Loading;