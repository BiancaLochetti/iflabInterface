import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';

import InputText from '../../components/inputs/InputText';
import GreenButton from '../../components/buttons/GreenButton';
import WhiteButton from '../../components/buttons/WhiteButton';

import styles from './styles';
import colors from '../../colors';

//--------------------------------------------------------

export function User({ navigation }) {
    return(
        <SafeAreaView style={styles.container}>
            <View style={{ alignContent: 'flex-start', gap: 30 }}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ position: 'absolute', left: 16 }} onPress={() => navigation.goBack()}>
                        <Image 
                            source={require('../../assets/icons/UI/left.png')}
                            style={{ tintColor: colors.iflab_gray_dark, width: 30 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', fontSize: 18 }}>Editar Perfil</Text>
                </View>
                
                <View style={styles.user}>
                    <TouchableOpacity style={{ gap: 10 }}>
                        <Image
                            source={require('../../assets/images/marcio.png')}
                            style={styles.userPic}
                        />
                        <Text style={{ color: colors.iflab_gray, textAlign: 'center' }}>Editar Foto de Perfil</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.subContainer}>
                    <Text style={styles.title}>Nome de Usuário:</Text>
                    <InputText
                        placeHolder="Nome"
                        type="text"
                    />  
                </View>

                <View style={styles.subContainer}>
                    <Text style={styles.title}>Email de Usuário:</Text>
                    <InputText
                        placeHolder="Email"
                        type="email"
                    />  
                </View>

                <View style={styles.subContainer}>
                    <Text style={styles.title}>Alterar Senha:</Text>
                    <InputText
                        placeHolder="Senha"
                        type="password"
                    />  
                </View>

                <View style={styles.subContainer}>
                    <Text style={styles.title}>Tipo de Usuário:</Text>
                    <View style={styles.vPicker}>
                        <Picker style={styles.picker}>
                            <Picker.Item label="Professor" value="Professor" />
                            <Picker.Item label="Aluno" value="Aluno" />
                            <Picker.Item label="Outro" value="Outro" />
                        </Picker>
                    </View>
                </View>
            </ScrollView>  

            <View style={styles.button}>
                <WhiteButton
                    text="Cancelar"
                />

                <GreenButton
                    text="Salvar Edições"
                />
            </View>  
        </SafeAreaView>

    );
}