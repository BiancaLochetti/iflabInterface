import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import React from 'react';
import colors from '../../colors';

//--------------------------------------------------------

const GreenButton = ({ text, onPress, disabled = false, icon = null }) => {
    return (
        <TouchableOpacity
            style={[styles.gButton, disabled && {backgroundColor: colors.iflab_gray_medium}]}
            onPress={onPress}
            disabled={disabled}
        >
            <View style={styles.content}>
                {icon && (
                    <Image
                        source={icon}
                        style={styles.icon}
                        resizeMode="contain"
                    />
                )}
                <Text style={[styles.gText, disabled && {color: colors.iflab_gray_dark} ]}>{text}</Text>
            </View>
        </TouchableOpacity>

    );
}

export default GreenButton;

//--------------------------------------------------------

const styles = StyleSheet.create({
    gButton: {
       backgroundColor: colors.iflab_green,
        borderRadius: 6,
        width: 'auto',
        alignItems: 'center',
    },
    
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        width: '100%',
        padding: 18,
    },

    icon: {
        width: 20,
        height: 20,
        tintColor: colors.iflab_white,
    },

    gText: {
        color: colors.iflab_white,
        fontSize: 16,   
    }
});