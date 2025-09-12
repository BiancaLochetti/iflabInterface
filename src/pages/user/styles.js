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
        marginRight: 20
    },
});

export default styles;