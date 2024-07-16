import { View, TouchableOpacity, Pressable, Text, Image } from "react-native";
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
        image: require("@/assets/images/page3.jpeg"),
        header: localization.t("cancelIfYouWant"),
        description: localization.t("joinToday"),
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
                    <Pressable onPress={() => console.log("Privacy")} style={styles.bannerButton}>
                        <Text style={styles.bannerButtonText}>
                            {localization.t("privacy")}
                        </Text>
                    </Pressable>
                    <Pressable onPress={() => console.log("Help")} style={styles.bannerButton}>
                        <Text style={styles.bannerButtonText}>
                            {localization.t("help")}
                        </Text>
                    </Pressable>
                </View>
            </View>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>
                    {localization.t("signIn")}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Landing;