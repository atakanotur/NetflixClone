import { useState } from 'react';
import { View, StyleSheet, StyleProp, TextStyle, Pressable } from 'react-native';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import responsiveFontSize from '@/source/theme/responsiveFontSize';
import colors from '@/source/theme/colors';
import { Text, TextInput } from '../../Atoms';
import localization from '@/source/lib/locales/localization';

type ControlledInputProps<TFieldValues extends FieldValues> = {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    placeholder: string;
    secureTextEntry?: boolean;
    style?: StyleProp<TextStyle>;
    onChangeText?: ((text: string) => void)
}

const ControlledInput = <TFieldValues extends FieldValues>({
    control,
    name,
    placeholder,
    secureTextEntry,
    style,
    onChangeText,
    ...otherProps
}: ControlledInputProps<TFieldValues>) => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(secureTextEntry ? true : false);
    const [selectionName, setSelectionName] = useState<string>("");
    const onFocus = () => {
        if (name === 'password') setSelectionName("password");
        if (name === 'emailOrPhoneNumber') setSelectionName("emailOrPhoneNumber");
    }
    const onBlur = () => setSelectionName("");

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { }, fieldState: { error } }) => (
                <>
                    <View style={selectionName !== "" ? (name === 'emailOrPhoneNumber' ? styles.focusedContainer : styles.focusedContainer) : styles.container}>
                        <View style={selectionName !== "" ? (name === 'emailOrPhoneNumber' ? styles.focusedTextInputContainer : styles.focusedTextInputContainer) : styles.textInputContainer}>
                            {name === 'emailOrPhoneNumber' && selectionName === 'emailOrPhoneNumber' && <Text style={styles.textInputTitle} text={localization.t("emailOrPhoneNumber")} />}
                            {name === 'password' && selectionName === 'password' && <Text style={styles.textInputTitle} text={localization.t("password")} />}
                            <TextInput
                                style={[styles.textInput, style]}
                                onChangeText={onChangeText}
                                placeholder={selectionName !== "" ? (name === 'emailOrPhoneNumber' ? "" : name === 'password' ? "" : placeholder) : placeholder}
                                secureTextEntry={passwordVisible}
                                placeholderTextColor={colors.whiteGrey}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                {...otherProps}
                            />
                        </View>
                        {name === 'password' &&
                            <Pressable style={styles.showHideButton} onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Text
                                    text={passwordVisible ? localization.t("show") : localization.t("hide")}
                                    style={styles.showHide}
                                />
                            </Pressable>}
                    </View>
                    {error && <View style={styles.error}><Text style={styles.errorMessage} text={error.message} /></View>}
                </>
            )}
        />
    );
};

export default ControlledInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: colors.grey,
        borderRadius: 5,
        justifyContent: 'space-between',
        marginTop: 10,
        height: 55,
    },
    focusedContainer: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: "#454545",
        borderRadius: 5,
        justifyContent: 'space-between',
        marginTop: 10,
        height: 55
    },
    textInputContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    focusedTextInputContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 5
    },
    textInput: {
        flex: 1,
        fontSize: responsiveFontSize(18),
        color: colors.white,
        borderRadius: 10,
        paddingLeft: 10,
    },
    textInputTitle: {
        color: colors.whiteGrey,
        fontSize: responsiveFontSize(13),
        paddingLeft: 10
    },
    showHideButton: {
        alignSelf: 'center',
        paddingRight: 10
    },
    showHide: {
        fontSize: responsiveFontSize(15),
        color: colors.whiteGrey
    },
    error: {
        width: '100%',
        alignSelf: 'flex-start',
        borderTopWidth: 2,
        borderTopColor: colors.orange,
    },
    errorMessage: {
        fontSize: responsiveFontSize(12),
        color: colors.orange,
        alignSelf: 'flex-start',
        marginBottom: 10
    }
});
