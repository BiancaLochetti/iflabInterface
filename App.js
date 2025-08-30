import { StyleSheet, Text, View } from 'react-native';
import colors from './src/colors'

//Botões
import GreenButton from './src/components/buttons/GreenButton';
import RedButton from './src/components/buttons/RedButton';
import WhiteButton from './src/components/buttons/WhiteButton';

//Input
import InputText from './src/components/inputs/InputText';
import { useState } from 'react';

export default function App() {
  /*
  import { useEffect, useState } from 'react'; -- No início
  import { registerCampus, listCampus } from './src/api/campusRequests'; -- No início

  const [campusList, setCampusList] = useState([]);
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState(false);

  // Pegar todos os dados
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const apiGet = await listCampus();
        
        setCampusList(apiGet.campusList);
        setMsg(apiGet.msg);
        setStatus(apiGet.status);
        
      } catch (error) {
        console.error('Erro ao buscar campus:', error);
      }
    };

    fetchAPI();
  }, []);
*/

  return (
    <View style={styles.container}>
      <GreenButton
      text={"Ola"}
      icon={require('./src/assets/icons/UI/check.png')}
      onPress={() => alert('Tufo')}
      disabled={false}
      />
      <RedButton
      text={"Ola"}
      icon={require('./src/assets/icons/UI/check.png')}
      onPress={() => alert('Tufo')}
      disabled={false}
      />
      <WhiteButton
      text={"Ola"}
      icon={require('./src/assets/icons/UI/check.png')}
      onPress={() => alert('Tufo')}
      disabled={true}
      />
      <InputText
      icon={require('./src/assets/icons/UI/email.png')}
      placeHolder={"Email do usuário"}
      type={"password"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.iflab_white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
});