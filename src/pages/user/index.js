import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import styles from './styles';
import colors from '../../colors';

//--------------------------------------------------------

export function User(){
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image 
                        source={require('../../assets/icons/UI/left.png')}
                        style={{ tintColor: colors.iflab_gray_dark, width: 30 }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <Text>Editar Perfil</Text>
            </View>
            
            <View style={styles.user}></View>
            <View style={styles.content}></View>
            <View style={styles.buttons}></View>
        </SafeAreaView>

    );
}