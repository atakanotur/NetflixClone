import { Stack } from "expo-router";
import { Host } from 'react-native-portalize';

const RootLayout = () => {
  return (
    <Host>
      <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack>
    </Host>
  )
}

export default RootLayout;