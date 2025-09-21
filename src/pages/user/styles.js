import { StyleSheet } from 'react-native';
import colors from '../../colors';

const styles = StyleSheet.create({
    container:{
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
        width: 170,
        height: 170,
        borderRadius: 100
    },
    
    content:{
        marginTop: 50,
        marginBottom: 50,
        gap: 50,
        alignContent: 'center' 
    },

    title:{
        fontSize: 16,
        color: colors.primary_text_gray
    },

    subContainer:{
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        gap: 10
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