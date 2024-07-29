import React, { useRef, createRef, useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import colors from "@/source/theme/colors";
import { Text, Button } from "../../Atoms";
import localization from "@/source/lib/locales/localization";
import responsiveFontSize from "@/source/theme/responsiveFontSize";

type PasswordModalProps = {
    onChange: (value: string) => boolean;
    onCancel: () => void;
};

const PasswordModal = ({ onChange, onCancel }: PasswordModalProps) => {
    const [isWrongCode, setIsWrongCode] = useState<boolean>(false);
    const [inputs, setInputs] = useState(["", "", "", ""]);
    const inputRefs = useRef([createRef<TextInput>(), createRef<TextInput>(), createRef<TextInput>(), createRef<TextInput>()]);

    const handleChange = (index: number, value: string) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.current?.focus();
        } else if (value.length === 0 && index > 0) {
            inputRefs.current[index - 1]?.current?.focus();
        }
        const password = newInputs.join('');
        if (!onChange(password)) {
            setInputs(["", "", "", ""]);
            inputRefs.current[0]?.current?.focus();
            setIsWrongCode(true);
        }
    };

    const handleKeyPress = (index: number, event: any) => {
        if (event.nativeEvent.key === 'Backspace' && inputs[index] === "" && index > 0) {
            inputRefs.current[index - 1]?.current?.focus();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.banner}>
                    {isWrongCode ?
                        (
                            <>
                                <Text text={localization.t("wrongPIN")} style={styles.wrongPIN} />
                                <Text text={localization.t("tryAgain")} style={styles.wrongPIN} />
                            </>
                        ) :
                        <Text text={isWrongCode ? localization.t("wrongPIN") : localization.t("enterYourPIN")} style={styles.enterPIN} numberOfLines={2} />}
                </View>
                <View style={styles.inputs}>
                    {inputs.map((value, index) => (
                        <TextInput
                            key={index}
                            ref={inputRefs.current[index]}
                            style={styles.input}
                            maxLength={1}
                            keyboardType="number-pad"
                            onChangeText={(value) => handleChange(index, value)}
                            onKeyPress={(event) => handleKeyPress(index, event)}
                            secureTextEntry
                            autoFocus={index === 0}
                            value={value}
                        />
                    ))}
                </View>
                <View style={styles.buttons}>
                    <Button style={[styles.button, { borderWidth: 0.2 }]} title={localization.t("forgotPIN")} titleStyle={styles.buttonText} />
                    <Button style={styles.button} title={localization.t("cancel")} titleStyle={[styles.buttonText, { fontWeight: '600' }]} onPress={onCancel} />
                </View>
            </View>
        </View>
    );
};

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
        padding: 15
    },
    wrongPIN: {
        alignSelf: 'center',
        color: colors.red,
        fontSize: responsiveFontSize(15),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    enterPIN: {
        alignSelf: 'center',
        color: colors.black,
        fontSize: responsiveFontSize(15),
        fontWeight: 'bold',
        textAlign: 'center',
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
});

export default PasswordModal;
