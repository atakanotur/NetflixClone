import { useRef, createRef } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import colors from "@/source/theme/colors";
import { Text, Button } from "../../Atoms";
import localization from "@/source/lib/locales/localization";
import responsiveFontSize from "@/source/theme/responsiveFontSize";

type PasswordModalProps = {
    onConfirm: (value: string) => void;
    onCancel: () => void;
};

const PasswordModal = ({ onConfirm, onCancel }: PasswordModalProps) => {
    let password = "";
    const inputRefs = useRef([createRef<TextInput>(), createRef<TextInput>(), createRef<TextInput>(), createRef<TextInput>()]);
    const handleChange = (index: number, value: string) => {
        password = `${password}${value}`
        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
        if (value.length === 0) {
            if (index === 0) password = "";
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
                password = password.slice(0, -1);
            }
        }
        onConfirm(password);
    };

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text text={localization.t("enterYourPIN")} style={styles.banner} numberOfLines={2} />
                <View style={styles.inputs}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <TextInput
                            key={index}
                            ref={el => (inputRefs.current[index] = el)}
                            style={styles.input}
                            maxLength={1}
                            keyboardType="number-pad"
                            onChangeText={(value) => handleChange(index, value)}
                            secureTextEntry
                            autoFocus={index === 0}
                        />
                    ))}
                </View>
                <View style={styles.buttons}>
                    <Button style={[styles.button, { borderWidth: 0.2 }]} title={localization.t("forgotPIN")} titleStyle={styles.buttonText} />
                    <Button style={styles.button} title={localization.t("cancel")} titleStyle={[styles.buttonText, { fontWeight: '600' }]} onPress={onCancel} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black
    },
    main: {
        width: 210,
        borderRadius: 10,
        backgroundColor: "#CACACA",
    },
    banner: {
        alignSelf: 'center',
        color: colors.black,
        fontSize: responsiveFontSize(15),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    inputs: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 5
    },
    input: {
        backgroundColor: colors.white,
        width: 40,
        height: 40,
        margin: 5,
        borderRadius: 5,
        fontSize: 20,
        textAlign: 'center',
        color: colors.black
    },
    buttons: {

    },
    button: {
        width: '100%',
        padding: 10
    },
    buttonText: {
        alignSelf: 'center',
        color: colors.darkBlue,
        fontSize: responsiveFontSize(16)
    },

})

export default PasswordModal