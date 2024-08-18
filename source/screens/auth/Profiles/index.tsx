import { useState } from 'react';
import { Pressable, View, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { PasswordModal, Text } from "@/source/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons } from '@expo/vector-icons';
import colors from '@/source/theme/colors';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { router } from 'expo-router';
import localization from '@/source/lib/locales/localization';
import styles from './styles';
import userStore from '@/source/store/userStore';

const Profiles = () => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const editModeBackgroundOpacity = useSharedValue("rgba(0, 0, 0, 0)");
    const [profilePasswordVisible, setProfileVisiblePassword] = useState<boolean>(false);
    const profile = userStore((state) => state.profile);
    const setProfile = userStore((state) => state.setProfile);
    const profiles = userStore((state) => state.user.profiles);

    const onChangeEditMode = () => {
        setEditMode(!editMode);
        if (editMode) editModeBackgroundOpacity.value = withTiming("rgba(0, 0, 0, 0)", { duration: 220 });
        else editModeBackgroundOpacity.value = withTiming("rgba(0, 0, 0, 0.6)", { duration: 220 });
    }

    const onConfirmProfilePassword = (value: string) => {
        if (value.length === 4) {
            if (value === profile?.password) {
                router.push({ pathname: "/home" });
                return true;
            }
            return false;
        }
        return true
    }

    const selectProfile = (profile: Profile) => {
        setProfile(profile);
        if (editMode) {
            //open profile editor
        }
        if (profile.locked) {
            return setProfileVisiblePassword(true);
        }
        return router.push({ pathname: "/home" });
    }

    const profilesRenderItem = ({ item }: { item: Profile, index: number }) => {
        return (
            <TouchableOpacity style={styles.profilesListRenderItemContainer} onPress={() => selectProfile(item)}>
                <ImageBackground source={{ uri: item.imageUrl }} style={styles.profileListRenderItemImage} imageStyle={{ borderRadius: 10 }}>
                    {editMode &&
                        <Animated.View style={[styles.profileListRenderItemImageOverlay, { backgroundColor: editModeBackgroundOpacity }]}>
                            <EvilIcons name="pencil" size={50} color={colors.white} />
                        </Animated.View>
                    }
                </ImageBackground>
                <Text text={item.name} style={styles.profileName} numberOfLines={1} />
                <EvilIcons name="lock" size={30} color={item.locked ? colors.white : colors.black} />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.banner}>
                <Text text={editMode ? localization.t("done") : localization.t("edit")} style={styles.blankText} />
                <Text text={editMode ? localization.t("profileManagement") : localization.t("whoIsWatching")} />
                <Pressable onPress={onChangeEditMode}>
                    <Text text={editMode ? localization.t("done") : localization.t("edit")} />
                </Pressable>
            </View>
            <FlatList
                extraData={profiles}
                data={profiles}
                renderItem={profilesRenderItem}
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={styles.profilesListContentContainer}
            />
            {profilePasswordVisible && <PasswordModal onCancel={() => setProfileVisiblePassword(false)} onChange={(value) => onConfirmProfilePassword(value)} />}
        </SafeAreaView>
    )
}

export default Profiles;
