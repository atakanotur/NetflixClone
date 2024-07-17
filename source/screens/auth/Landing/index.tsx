import { View, TouchableOpacity, Text, Image, Linking } from "react-native";
import { router } from "expo-router";
import styles from "./styles";
import localization from "@/source/lib/locales/localization";
import LandingList from "@/source/components/Molecules/LandingList";

const landingData: { image: string, header: string, description: string, signUp: string }[] = [
    {
        image: require("@/assets/images/page1.jpeg"),
        header: localization.t("watchEverywhere"),
        description: localization.t("watchOnAnyDevice"),
        signUp: localization.t("signUp"),
    },
    {
        image: require("@/assets/images/page2.jpeg"),
        header: localization.t("suitablePaymentPlan"),
        description: localization.t("littlePriceBigFun"),
        signUp: localization.t("signUp"),
    },
    {
        image: require("@/assets/images/page3.jpeg"),
        header: localization.t("cancelIfYouWant"),
        description: localization.t("joinToday"),
        signUp: localization.t("signUp"),
    },
    {
        image: null,
        header: localization.t("howCanIWatch"),
        description: localization.t("youCanWatchOnThisApp"),
        signUp: localization.t("signUp"),
    }
];

const Landing = () => {
    return (
        <View style={styles.container}>
            <LandingList data={landingData} />
            <View style={styles.banner}>
                <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj0jWPJ2dABPXDnURT5UrGTNzA5ONHfTO2qQ&s" }} resizeMode="contain" style={styles.logo} />
                <View style={styles.bannerButtons}>
                    <Text style={styles.bannerButtonText} onPress={() => Linking.openURL("https://help.netflix.com/legal/privacy")}>
                        {localization.t("privacy")}
                    </Text>
                    <Text style={styles.bannerButtonText} onPress={() => Linking.openURL("https://help.netflix.com")}>
                        {localization.t("help")}
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/(auth)/login")}>
                <Text style={styles.loginButtonText}>
                    {localization.t("signIn")}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Landing;