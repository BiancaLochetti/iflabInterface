import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { registerCampus, listCampus } from './src/api/campusRequests';
import { Routes } from './src/pages/routes';
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  /*const [campusList, setCampusList] = useState([]);
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState(false);

  // Pegar todos os dados
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const apiGet = await listCampus();

        console.log(apiGet);
        
        setCampusList(apiGet.campusList);
        setMsg(apiGet.msg);
        setStatus(apiGet.status);
        
      } catch (error) {
        console.error('Erro ao buscar campus:', error);
      }
    };

    fetchAPI();
  }, []);*/



  return (
    <Text>ARRUMAR ROUTES.JS</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});