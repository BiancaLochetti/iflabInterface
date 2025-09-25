// Imports
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Modal,
  Text,
} from "react-native";

import Button from '../buttons/Button'

import { useState } from "react";
import colors from "../../colors";

//----------------------------------------------------------------------------------------------

// Componente Principal
const EmailModal = ({ backPage, notCode, emailVerify, modalActive, withoutBg }) => {
  const [code, setCode] = useState("")

  return (
    <Modal transparent visible={modalActive} animationType="none">
      <View style={[styles.outerView, withoutBg && styles.outerViewW]}>
        <View style={styles.modal}>
          <Text style={styles.title}>Insira o código de verificação</Text>
          <View style={styles.codeContainer}>
              {[...Array(5)].map((_, i) => (
                <TextInput
                  key={i}
                  style={styles.codeInput}
                  maxLength={1}
                  keyboardType="numeric"
                  onChangeText={(digit) => {
                    const newCode = code.split("");
                    newCode[i] = digit;
                    setCode(newCode.join(""));
                  }}
                />
              ))}
          </View>

          <Button
            text="Não recebeu o código? Reenviar"
            onPress={notCode}
            type="White"
          />

          <View style={{ marginLeft: 30, marginRight: 30, marginTop: 20 }}>
            <Button
              text="Verificar email"
              onPress={emailVerify}
              type="Green"
            />
          </View>

          <Button
              text="Voltar"
              onPress={backPage}
              type="White"
          />
        </View>
      </View>
    </Modal>
  );
};

export default EmailModal;

//----------------------------------------------------------------------------------------------

// Styles
const styles = StyleSheet.create({
  outerView:{
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  outerViewW:{
    backgroundColor: "rgba(0,0,0,0.0)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modal:{
    backgroundColor: colors.white_full, 
    padding: 20, 
    borderRadius: 10
  },

  title:{
    fontSize: 20,
    fontWeight: "500",
    color: colors.primary_green_dark,
    textAlign: "center",
    marginBottom: 32,
  },

  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },

  codeInput: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: colors.emphasis_gray,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: colors.white_full,
    marginHorizontal: 6,
  },

})
