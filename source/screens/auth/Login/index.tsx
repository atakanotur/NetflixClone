import { Image, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/source/components';
import localization from '@/source/lib/locales/localization';
import { ControlledInput, Button } from '@/source/components/';
import { useLoginForm } from '@/source/lib/resolverSchema';

const Login = () => {
    const { handleSubmit, control } = useLoginForm();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Ionicons name='chevron-back' size={24} color='white' />
                <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj0jWPJ2dABPXDnURT5UrGTNzA5ONHfTO2qQ&s" }} resizeMode="contain" style={styles.logo} />
                <Text text={localization.t("help")} />
            </View>
            <View style={styles.main}>
                <ControlledInput control={control} name="email" placeholder={localization.t("email")} />
                <ControlledInput control={control} name="password" placeholder={localization.t("password")} secureTextEntry />
                <Button />
                <Text text={localization.t("or")} />
                <Button />
                <Text text='Forgot password?' />
            </View>
        </SafeAreaView>
    )
}

export default Login;