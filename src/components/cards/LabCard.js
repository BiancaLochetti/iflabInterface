import { Text, StyleSheet, View, Image } from 'react-native';
import colors from '../../colors';

//--------------------------------------------------------

const LabCard = ({ lab, status, responsable, hour, lastResp = null, lastHour = null }) => {
    const cardStyle = [
        styles.card,
        { backgroundColor: status ? colors.iflab_green : colors.iflab_gray_light }
    ];

    const iconStyle = [
        styles.icon,
        { tintColor: status ? colors.iflab_white : colors.iflab_gray_dark }
    ];
    
    const textStyle = [
        styles.text,
        { color: status ? colors.iflab_white : colors.iflab_gray }
    ];

    return (
        <View style={cardStyle}>
            <View style={styles.header}>
                <Text style={textStyle}>
                    Laboratório <Text style={{fontWeight: 'bold'}}>{lab}</Text>
                </Text>
                <View style={{flexDirection: 'row', gap: 8}}>
                    {status ? (
                    <>
                        <Image 
                            style={iconStyle}
                            resizeMode='contain'
                            source={require('../../assets/icons/UI/check.png')}/>
                        <Text style={textStyle}>Livre para reservar</Text>
                    </>
                    ) : (
                    <>
                        <Image 
                            style={iconStyle}
                            resizeMode='contain'
                            source={require('../../assets/icons/UI/alert.png')}/>
                        <Text style={textStyle}>Em uso no momento</Text>
                    </>
                    )}
                </View>
            </View>
            <View style={styles.content}>
                {status ? (
                <>
                    <Text style={textStyle}>Informações da última sessão:</Text>
                    <Text style={textStyle}>Responsável: {lastResp}</Text>
                    <Text style={textStyle}>Horário: {lastHour}</Text>
                </>
                ):(
                <>
                    <Text style={textStyle}>Informações da sessão atual:</Text>
                    <Text style={textStyle}>Responsável: {responsable}</Text>
                    <Text style={textStyle}>Horário estipulado: {hour}</Text>
                </>
                )}
            </View>
        </View>


    );
}

export default LabCard;

//--------------------------------------------------------

const styles = StyleSheet.create({
    card:{
        height: 150,
        width: '90%',
        borderRadius: 10,
        padding: 10,
    },

    header:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    content:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },

    text:{
        color: colors.iflab_white,
        fontSize: 16,
        flexDirection: 'row'
        
    },

    icon:{
        width: 22,
        height: 22,
        marginLeft: 10
    }
    
});