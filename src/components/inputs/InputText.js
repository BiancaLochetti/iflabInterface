import { TextInput, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react';
import colors from '../../colors';

//--------------------------------------------------------

const InputText = ({ placeHolder, type, icon, onChange }) => {
    const [value, setValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function handleOnChange(text) {
        setValue(text);
        onChange && onChange(text);
    }
    
    return(
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder={placeHolder}
                placeholderTextColor={colors.iflab_gray}
                secureTextEntry={type === "password" && !showPassword}
                value={value}
                onChangeText={handleOnChange}
                keyboardType={type}
            />

            {/* //Condição caso o tipo seja senha */}
            {type === "password" ? (

                // Se for senha:
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} >
                    <Image
                        source={
                            showPassword 
                            ? require('../../assets/icons/UI/show.png') 
                            : require('../../assets/icons/UI/hide.png')
                        } 
                        style={styles.iconImage}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            ) : (

                // Se não for senha:
                <View>
                    <Image 
                    source={icon} 
                    style={styles.iconImage}
                    resizeMode='contain' />
                </View>
            )}
        </View>
    );
}

export default InputText;

//--------------------------------------------------------

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.iflab_gray_dark,
    },

    input: {
        flex: 1,
        height: 40,
        color: colors.iflab_gray_dark,
    },

    iconImage: {
        width: 22,
        height: 22,
        marginLeft: 10,
        tintColor: colors.iflab_gray
    },
});