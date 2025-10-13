import { StyleSheet } from 'react-native';
import colors from '../../colors';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white_full,
        paddingHorizontal: "2rem"
    },

// ---------------------------------------------------------

    header:{
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },

    user:{
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center'
    },

    userPic:{
        height: 170,
        width: 170,
        borderRadius: "10rem",
    },

// ---------------------------------------------------------
    
    content:{
        gap: "10%",
        justifyContent: 'center',
        flex: 2,
    },

    title:{
        fontSize: 16,
        color: colors.primary_text_gray,
    },

    subContainer:{
        marginHorizontal: "2rem",
        gap: '0.5rem'
    },

    emailContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1, 
        gap: "2%"
    },

// ---------------------------------------------------------

    button:{
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,

    },

});

export default styles;