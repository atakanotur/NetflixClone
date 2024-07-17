import React from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import responsiveFontSize from '@/source/theme/responsiveFontSize';
import colors from '@/source/theme/colors';
import { Text, TextInput } from '../../Atoms';

type ControlledInputProps<TFieldValues extends FieldValues> = {
    control: Control<TFieldValues>;
    name: FieldPath<TFieldValues>;
    placeholder: string;
    secureTextEntry?: boolean;
    style?: StyleProp<TextStyle>;
}

const ControlledInput = <TFieldValues extends FieldValues>({
    control,
    name,
    placeholder,
    secureTextEntry,
    style,
    ...otherProps
}: ControlledInputProps<TFieldValues>) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <>
                    <TextInput
                        style={[styles.textInput, style]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        {...otherProps}
                    />
                    {error && <Text style={styles.errorMessage} text={error.message} />}
                </>
            )}
        />
    );
};

export default ControlledInput;

const styles = StyleSheet.create({
    textInput: {
        fontSize: responsiveFontSize(15),
        backgroundColor: colors.grey,
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.grey,
        padding: 7,
    },
    errorMessage: {
        color: colors.black,
    },
});
