//Import nativo
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

//Import estilização
import styles from "./styles";
import colors from "../../colors";

//Import components
import { DataSelection } from "../../components/cards/DataSelection";
import { Sections } from "../../components/cards/Sections";

//Import API
//import { listSections } from "../../api/SectionsRequests";

//--------------------------------------------------------

// Página Principal
export function Calendar() {
  /*   const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchSessions() {
        setLoading(true);
        const result = await listSections();
        if (result && result.sessionsList) {
          setSessions(result.sessionsList);
        } else {
          setSessions([]);
        }
        setLoading(false);
      }
      fetchSessions();
    }, []); */

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white_full }}>
      {/*       <View style={styles.header}>
        <TouchableOpacity style={{ position: "absolute", left: 20 }}>
          <Image
            source={require("../../assets/icons/UI/chevrom.png")}
            style={{
              tintColor: colors.contrastant_gray,
              width: 30,
              height: 30,
              transform: [{ rotate: '90deg' }]
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={{ textAlign: "center", fontSize: 16 }}>
          Calendário do laboratório{" "}
          <Text style={{ fontWeight: "bold" }}>A108</Text>
        </Text>
      </View>

      <View style={{ zIndex: 1 }}>
        <DataSelection />
      </View>

      <View>
        <View
          style={{
            marginBottom: 5,
            marginLeft: 20,
            marginRight: 20,
            flex: 1,
            zIndex: -1,
          }}
        >
          <Text style={[styles.textFont, { marginBottom: 10 }]}>
            Sessões em andamento:
          </Text>
          {loading ? (
            <Text style={{ textAlign: 'center', color: '#555' }}>Carregando...</Text>
          ) : sessions.length === 0 ? (
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
              <Text style={{ textAlign: 'center', color: '#555' }}>Nenhuma sessão reservada</Text>
            </View>
          ) : (
            sessions.map((session, idx) => (
              <Sections
                key={session.sessionId || idx}
                inicio={session.date}
                fim={session.date}
                materiaisReservados={session.equipmentsQtd}
                elementosReservados={session.elementsQtd}
                labName={session.labName}
                formDone={session.formDone}
              />
            ))
          )}
        </View>
      </View>
 */}
    </SafeAreaView>
  );
}