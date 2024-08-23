import { TabBar } from "@/source/components";
import localization from "@/source/lib/locales/localization";
import colors from "@/source/theme/colors";
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const MainLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(0,0,0,0.9)",
          borderBlockColor: "rgba(0,0,0,0.9)",
        },
        headerShown: false,
        tabBarActiveTintColor: colors.white,
      }} initialRouteName="profiles" >
      <Tabs.Screen name="home" options={{
        tabBarStyle: {
          backgroundColor: "rgba(0,0,0,0.9)",
          borderBlockColor: "rgba(0,0,0,0.9)",
        },
        title: localization.t("home"),
        headerShown: false, tabBarIcon: ({ color, size }) => {
          return <Foundation name="home" size={size} color={color} />
        }
      }} />
      <Tabs.Screen name="newAndPopular" options={{
        title: localization.t("newAndPopular"),
        headerShown: false, tabBarIcon: ({ color, size }) => {
          return <MaterialCommunityIcons name="animation-play-outline" size={size} color={color} />
        }
      }} />
      <Tabs.Screen name="myNetflix" options={{
        title: localization.t("myNetflix"),
        headerShown: false, tabBarIcon: ({ color, size }) => {
          return <Foundation name="home" size={size} color={color} />
        }
      }} />
    </Tabs>
  )
};

export default MainLayout;