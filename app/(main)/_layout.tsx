import { Stack } from "expo-router";

const MainLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="profiles">
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="profiles" options={{ headerShown: false }} />
    </Stack>
  )
};

export default MainLayout;