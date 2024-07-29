import { EvilIcons, Ionicons, Foundation } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const MainLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "rgba(0,0,0,0.1)",
        tabBarBackground: (() => {
          return null
        }),
        tabBarIcon: (
          { color, focused, size }
        ) => {
          return <Foundation name="home" size={size} color={color} />
        }
      }} initialRouteName="profiles" >
      <Tabs.Screen name="home" options={{ headerShown: false }} />
    </Tabs>
  )
};

export default MainLayout;