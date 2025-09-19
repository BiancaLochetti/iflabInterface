import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    header:{
        height: "10%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-center",
        margin: 10,

    },

    cabecalho:{
        marginLeft: 5,
        width: '10%',
        height: undefined,
        aspectRatio: 1,
        tintColor: 'black',
    },

    titleFree: {
        fontSize: 16,
        fontWeight: 'normal',
        fontFamily: 'Inter',
        flex: 1,
        textAlign: 'center',
    },

    TextFont: {
        fontSize: 18,
        fontWeight: 'normal',
        fontFamily: 'Inter',
    }
    
});

export default styles;