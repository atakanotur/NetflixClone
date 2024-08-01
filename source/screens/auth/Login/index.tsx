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
import userStore from '@/source/store/userStore';
import categoryStore from '@/source/store/categoryStore';
import movieStore from '@/source/store/movieStore';
import movies from '@/source/data/movie';
import categories from '@/source/data/categories';

const Login = () => {
    const { handleSubmit, control } = useLoginForm();
    const [singInDisabled, setSignInDisabled] = useState<boolean>(true);
    const user = userStore((state) => state.user);
    const setUser = userStore((state) => state.setUser);
    const setCategories = categoryStore((state) => state.setCategories);
    const setMovies = movieStore((state) => state.setMovies);
    const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onChangeEmailOrPhoneNumber = (text: string) => {
        setEmailOrPhoneNumber(text)
        if (text.length > 4 && password.length >= 8) setSignInDisabled(false);
        else setSignInDisabled(true);
    }

    const onChangePassword = (text: string) => {
        setPassword(text);
        if (text.length >= 8 && emailOrPhoneNumber.length > 4) setSignInDisabled(false);
        else setSignInDisabled(true);
    }

    const onSubmit = () => {
        if ((emailOrPhoneNumber === user.email || emailOrPhoneNumber === user.phoneNumber) && password === user.password) {
            setUser({
                ...user,
                profiles: [
                    {
                        id: "0",
                        name: "Profile 1",
                        imageUrl: "https://occ-0-4609-769.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABbHuAP6AwsPJ8qFBs6GRLRjPnViP_Q1d-QL2M_Rq7YdGyi8RcwZgLFbuAtuRJtjSd2liw0G8_c0nWUG3HD9J7Eeu2cxbZVTiMOFw.png?r=558",
                        locked: true,
                        password: "1234"
                    },
                    {
                        id: "1",
                        name: "Profile 2",
                        imageUrl: "https://occ-0-4609-769.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABbHuAP6AwsPJ8qFBs6GRLRjPnViP_Q1d-QL2M_Rq7YdGyi8RcwZgLFbuAtuRJtjSd2liw0G8_c0nWUG3HD9J7Eeu2cxbZVTiMOFw.png?r=558",
                        locked: true,
                        password: "1234"
                    },
                    {
                        id: "2",
                        name: "Profile 3",
                        imageUrl: "https://occ-0-4609-769.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABbHuAP6AwsPJ8qFBs6GRLRjPnViP_Q1d-QL2M_Rq7YdGyi8RcwZgLFbuAtuRJtjSd2liw0G8_c0nWUG3HD9J7Eeu2cxbZVTiMOFw.png?r=558",
                        locked: true,
                        password: "1234"
                    },
                    {
                        id: "3",
                        name: "Profile 4",
                        imageUrl: "https://occ-0-4609-769.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABbHuAP6AwsPJ8qFBs6GRLRjPnViP_Q1d-QL2M_Rq7YdGyi8RcwZgLFbuAtuRJtjSd2liw0G8_c0nWUG3HD9J7Eeu2cxbZVTiMOFw.png?r=558",
                        locked: false
                    },
                    {
                        id: "4",
                        name: "Profile 5",
                        imageUrl: "https://occ-0-4609-769.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABbHuAP6AwsPJ8qFBs6GRLRjPnViP_Q1d-QL2M_Rq7YdGyi8RcwZgLFbuAtuRJtjSd2liw0G8_c0nWUG3HD9J7Eeu2cxbZVTiMOFw.png?r=558",
                        locked: false
                    },
                ]
            });
            setMovies(movies);
            setCategories(categories);
            router.replace({ pathname: "/profiles" });
        }
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