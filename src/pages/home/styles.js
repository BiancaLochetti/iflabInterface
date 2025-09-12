import { StyleSheet } from 'react-native';
import colors from '../../colors';

const styles = StyleSheet.create({
    container:{
        gap: 15,
        backgroundColor: colors.iflab_white,
        height: '100%'
    },

    header:{
        height: "10%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: 20,
        marginRight: 10
    },

    logo:{
        width: 100
    },

    profile:{
        height: 50,
        width: 50,
        borderRadius: 50,
        filter: 'drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.25))'
    },

    addLab: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginRight: 10
    },

    content:{
        marginTop: 20,
        alignItems: 'center',
        gap: 15,
        paddingBottom: 30
    }
});

export default styles;