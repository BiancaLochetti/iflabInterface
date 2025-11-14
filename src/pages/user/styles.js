import EStyleSheet from "react-native-extended-stylesheet";
import colors from '../../colors';

const styles = EStyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white_full,
        paddingHorizontal: "1rem"
    },

// ---------------------------------------------------------

    header:{
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        height: "10%",
    },

    user:{
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    userPic:{
        height: 170,
        width: 170,
        borderRadius: 100,
    },

// ---------------------------------------------------------
    
    content:{
        gap: "10%",
        justifyContent: 'center',
        flex: 3,
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
        gap: 10
    },

// ---------------------------------------------------------

    button:{
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: "1rem",
        flex: 0.5,

    },

});

export default styles;