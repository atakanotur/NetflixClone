import { Stack } from 'expo-router';

const SideLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='search' options={{ headerShown: false }} />
            <Stack.Screen name='downloads' options={{ headerShown: false }} />
        </Stack>
    )
}

export default SideLayout;