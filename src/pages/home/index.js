import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";

import LabCard from '../../components/cards/LabCard';
import WhiteButton from '../../components/buttons/WhiteButton'

//--------------------------------------------------------

export function Home() {
    return(
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/icons/UI/user.png')}
                        style={styles.profile}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.addLab}>
                <WhiteButton
                    text="Adicionar Laboratório"
                    icon={require('../../assets/icons/UI/more.png')}
                    onPress={() => alert('AddLab!')}
                    disabled={false}
                />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <LabCard status={false}/>
                <LabCard status={true}/>
                <LabCard status={true}/>
                <LabCard status={false}/>
            </ScrollView>
            
        </SafeAreaView>
    );
}
