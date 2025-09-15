import { StyleSheet } from 'react-native';
import colors from '../../colors';

const styles = StyleSheet.create({
    container:{
        height: '100%',
        gap: 35,
        backgroundColor: colors.iflab_white,
        height: '100%'
    },

    header:{
        marginTop: 10,
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
        borderWidth: 2,
        borderColor: colors.iflab_gray_dark,
        borderStyle: 'solid',
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
        borderColor: colors.iflab_gray_medium,
        borderRadius: 10,
        maxheight: "90%"
    },

    picker:{
        backgroundColor: colors.iflab_gray_medium,
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