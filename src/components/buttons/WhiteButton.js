import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import React from 'react';
import colors from '../../colors';

//--------------------------------------------------------

const WhiteButton = ({text, icon = null, disabled = false, onPress}) => {
    return(
        <TouchableOpacity 
        style={[styles.wButton, disabled && {backgroundColor: colors.iflab_gray_medium}]}
        disabled={disabled}
        onPress={onPress}
        >

            <View style={styles.content}>
                {icon &&
                    <Image
                    source={icon}
                    style={[styles.icon, disabled && {tintColor: colors.iflab_white}]}
                    resizeMode='contain'
                    />
                }
                <Text style={[styles.wText, disabled && {color: colors.iflab_gray_dark}]}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default WhiteButton;

//--------------------------------------------------------

const styles = StyleSheet.create({
    wButton: {
        backgroundColor: colors.iflab_white,
        borderRadius: 6,
        width: '50%',
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
        tintColor: colors.iflab_green,
    },

    wText: {
        color: colors.iflab_green_light,
        fontSize: 16,   
    }
});