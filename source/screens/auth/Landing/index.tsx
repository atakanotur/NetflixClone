import { View, TouchableOpacity, Pressable, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import localization from "@/source/lib/locales/localization";

const Landing = () => {
    return (
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
    )
}

export default Landing;