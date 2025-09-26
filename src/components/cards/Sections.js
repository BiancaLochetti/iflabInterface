import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import colors from '../../colors';

export function Sections({ inicio, fim, materiaisReservados, elementosReservados, labName, formDone }) {
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
                <Text style={styles.titleFree}>{inicio} até {fim}</Text>
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
                <Text style={styles.TextFont}>{elementosReservados} elementos reservados</Text>
                <Text style={styles.TextFont}>{materiaisReservados} equipamentos reservados</Text>
                {labName && <Text style={styles.TextFont}>Laboratório: {labName}</Text>}
                {formDone !== undefined && (
                  <Text style={styles.TextFont}>Formulário: {formDone ? 'Preenchido' : 'Pendente'}</Text>
                )}
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
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 10,
    },

    finishText: {
        color: colors.primary_text_gray,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});