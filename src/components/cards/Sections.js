import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

export function Sections() {
    const [showBox, setShowBox] = useState(false);

    const handleArrowPress = () => {
        setShowBox(!showBox);
    };

    const handleFinish = () => {
        alert('Seção finalizada!');
        setShowBox(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleFree}>11:30 até 14:40</Text>
                <TouchableOpacity onPress={handleArrowPress}>
                    <Image
                        source={require('../../assets/icons/UI/down.png')}
                        style={styles.downIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>   
            </View>
            {showBox && (
                <TouchableOpacity style={styles.finishBox} onPress={handleFinish}>
                    <Text style={styles.finishText}>Finalizar seção</Text>
                </TouchableOpacity>
            )}
            <View>
                <Text style={styles.TextFont}>3 elementos reservados</Text>
                <Text style={styles.TextFont}>6 equipamentos reservados</Text>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(245,245,245,1)',
        padding: 15,
        borderRadius: 16,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        fontFamily: 'Inter-Regular'
    },

    titleFree: {
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Inter',
        flex: 1,
        textAlign: 'left',
    },

    TextFont: {
        fontSize: 14,
        fontWeight: 'normal',
        fontFamily: 'Inter',
        color: "#555555",
    },

    downIcon: {
        width: 24,
        height: 24,
        marginLeft: 8,
    },

    finishBox: {
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: 'flex-end',
    },

    finishText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});