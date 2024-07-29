import { useState } from 'react';
import { Image, Linking, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/source/components';
import localization from '@/source/lib/locales/localization';
import { ControlledInput, Button } from '@/source/components/';
import { useLoginForm } from '@/source/lib/resolverSchema';
import { router } from 'expo-router';

const Login = () => {
    const { handleSubmit, control } = useLoginForm();
    const [singInDisabled, setSignInDisabled] = useState<boolean>(true);
    const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState<string>("atakan.otur@hotmail.com");
    const [password, setPassword] = useState<string>("12345678");

    const onChangeEmailOrPhoneNumber = (text: string) => {
        setEmailOrPhoneNumber(text);
        if (text.length > 4 && password.length > 8) setSignInDisabled(false);
        else setSignInDisabled(true);
    }

    const onChangePassword = (text: string) => {
        setPassword(text);
        if (text.length > 8 && emailOrPhoneNumber.length > 4) setSignInDisabled(false);
        else setSignInDisabled(true);
    }

    const onSubmit = ({ emailOrPhoneNumber, password }: { emailOrPhoneNumber: string, password: string }) => {
        if (emailOrPhoneNumber && password) if (emailOrPhoneNumber === "atakan.otur@hotmail.com" && password === "12345678") router.push("/(auth)/profiles");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Ionicons name='chevron-back' size={24} color='white' onPress={() => router.back()} />
                <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj0jWPJ2dABPXDnURT5UrGTNzA5ONHfTO2qQ&s" }} resizeMode="contain" style={styles.logo} />
                <Text text={localization.t("help")} onPress={() => Linking.openURL("https://help.netflix.com")} />
            </View>
            <View style={styles.main}>
                <ControlledInput control={control} name="emailOrPhoneNumber" placeholder={localization.t("emailOrPhoneNumber")} onChangeText={e => onChangeEmailOrPhoneNumber(e)} />
                <ControlledInput control={control} name="password" placeholder={localization.t("password")} secureTextEntry onChangeText={e => onChangePassword(e)} />
                <Button onPress={handleSubmit(onSubmit)} title={localization.t("signIn")} style={singInDisabled ? styles.signInButtonDisabled : styles.signInButton} titleStyle={singInDisabled ? styles.signInButtonTitleDisabled : styles.signInButtonTitle} disabled={singInDisabled} />
                <Text text={localization.t("or")} style={styles.or} />
                <Button title={localization.t("useSignInCode")} style={styles.signInWithCodeButton} titleStyle={styles.signInWithCodeButtonTitle} />
                <Button onPress={() => Linking.openURL('https://www.netflix.com/tr/loginhelp?fromApp=true')} title={localization.t("forgotPassword")} style={styles.forgotPasswordButton} titleStyle={styles.forgotPasswordButtonTitle} />
                <Text text={localization.t("reCAPTCHA")} style={styles.reCAPTCHA} />
            </View>
        </SafeAreaView>
    )
}

export default Login;