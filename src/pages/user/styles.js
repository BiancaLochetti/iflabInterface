import { StyleSheet } from 'react-native';
import colors from '../../colors';

const styles = StyleSheet.create({
    container:{
        gap: 35,
        backgroundColor: colors.white_full,
        height: '100%'
    },

    header:{
        marginTop: 15,
        alignItems: "center",
        justifyContent: "center",
        position: 'relative'
    },

    user:{
        flexDirection: 'column',
        alignItems: 'center'
    },

    userPic:{
        width: 150,
        height: 150,
        borderRadius: 100
    },
    
    content:{
        marginTop: 25,
        gap: 30,
        alignContent: 'center'  
    },

    title:{
        fontSize: 16,
        fontWeight: 'bold'
    },

    subContainer:{
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        gap: 10
    },

    vPicker:{
        borderWidth: 4,
        borderColor: colors.emphasis_gray,
        borderRadius: 10,
        maxheight: "90%"
    },

    picker:{
        backgroundColor: colors.emphasis_gray,
        minWidth: '90%',
        maxheight: "100%"
    },

    button:{
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
        alignContent: 'flex-end'
    }
});

export default styles;