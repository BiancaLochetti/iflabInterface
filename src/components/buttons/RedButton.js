import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import React from 'react';
import colors from '../../colors';

//--------------------------------------------------------

const RedButton = ({text, icon = null, onPress, disabled = false}) => {
    return(
        <TouchableOpacity
            style={[styles.rButton, disabled && {backgroundColor: colors.iflab_gray_medium}]}
            disabled={disabled}
            onPress={onPress}
        >
        
            <View style={styles.content}>
                {icon && 
                    <Image 
                    style={styles.icon}
                    source={icon}
                    resizeMode='contain'/>
                }
                <Text style={[styles.rText, disabled && {color: colors.iflab_gray_dark}]}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default RedButton;

//--------------------------------------------------------

const styles = StyleSheet.create({
    rButton: {
        backgroundColor: colors.iflab_red,
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
        tintColor: colors.iflab_white,
    },

    rText: {
        color: colors.iflab_white,
        fontSize: 16,   
    }
});