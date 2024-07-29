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

type Profile = {
    id: number,
    name: string,
    imageUrl: string,
    locked: boolean,
    password?: string
}

const Profiles = () => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const editModeBackgroundOpacity = useSharedValue("rgba(0, 0, 0, 0)");
    const [profilePasswordVisible, setProfileVisiblePassword] = useState<boolean>(false);
    const [profile, setProfile] = useState<Profile>();
    const profilesData: Profile[] = [
        {
            id: 1,
            name: "Profile 1",
            imageUrl: "https://occ-0-4609-769.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABbHuAP6AwsPJ8qFBs6GRLRjPnViP_Q1d-QL2M_Rq7YdGyi8RcwZgLFbuAtuRJtjSd2liw0G8_c0nWUG3HD9J7Eeu2cxbZVTiMOFw.png?r=558",
            locked: true,
            password: "1234"
        },
        {
            id: 2,
            name: "Profile 2",
            imageUrl: "https://occ-0-4609-769.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABbHuAP6AwsPJ8qFBs6GRLRjPnViP_Q1d-QL2M_Rq7YdGyi8RcwZgLFbuAtuRJtjSd2liw0G8_c0nWUG3HD9J7Eeu2cxbZVTiMOFw.png?r=558",
            locked: true,
            password: "1234"
        },
        {
            id: 3,
            name: "Profile 3",
            imageUrl: "https://occ-0-4609-769.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABbHuAP6AwsPJ8qFBs6GRLRjPnViP_Q1d-QL2M_Rq7YdGyi8RcwZgLFbuAtuRJtjSd2liw0G8_c0nWUG3HD9J7Eeu2cxbZVTiMOFw.png?r=558",
            locked: false
        },
        {
            id: 4,
            name: "Profile 3",
            imageUrl: "https://occ-0-4609-769.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABbHuAP6AwsPJ8qFBs6GRLRjPnViP_Q1d-QL2M_Rq7YdGyi8RcwZgLFbuAtuRJtjSd2liw0G8_c0nWUG3HD9J7Eeu2cxbZVTiMOFw.png?r=558",
            locked: false
        },
        {
            id: 5,
            name: "Profile 3",
            imageUrl: "https://occ-0-4609-769.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABbHuAP6AwsPJ8qFBs6GRLRjPnViP_Q1d-QL2M_Rq7YdGyi8RcwZgLFbuAtuRJtjSd2liw0G8_c0nWUG3HD9J7Eeu2cxbZVTiMOFw.png?r=558",
            locked: true,
            password: "1234"
        },
    ];

    const onChangeEditMode = () => {
        setEditMode(!editMode);
        if (editMode) editModeBackgroundOpacity.value = withTiming("rgba(0, 0, 0, 0)", { duration: 220 });
        else editModeBackgroundOpacity.value = withTiming("rgba(0, 0, 0, 0.6)", { duration: 220 });
    }

    const onConfirmProfilePassword = (value: string) => {
        if (value.length === 4) {
            if (value === profile?.password) {
                router.push("/(main)/home");
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
        return router.push("/(main)/home");
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
                data={profilesData}
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
