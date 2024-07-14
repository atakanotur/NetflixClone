import { Stack } from "expo-router";

const AuthLayout = () => {
    return (
        <Stack initialRouteName="loading" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="loading" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="landing" options={{ headerShown: false }} />
        </Stack>
    )
}