// Imports
import { TextInput, View, Modal, Text } from "react-native";

import Button from "../buttons/Button";
import { useState } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../../colors";

//----------------------------------------------------------------------------------------------

// Componente principal
const EmailModal = ({
  backPage,
  notCode,
  emailVerify,
  modalActive,
  withoutBg
}) => {
  const [code, setCode] = useState("");

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

          <View style={styles.verifyButtonWrapper}>
            <Button text="Verificar email" onPress={() => emailVerify(code)} type="Green" />
          </View>

          <Button text="Voltar" onPress={backPage} type="White" />
        </View>
      </View>
    </Modal>
  );
};

export default EmailModal;

//----------------------------------------------------------------------------------------------

// Styles 
const styles = EStyleSheet.create({
  outerView: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  outerViewW: {
    backgroundColor: "rgba(0,0,0,0.0)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    backgroundColor: colors.white_full,
    marginTop: '4rem' ,
    padding: "1.25rem",
    borderRadius: "0.625rem",
    alignItems: "center",
  },

  title: {
    fontSize: "1.25rem",
    fontWeight: "500",
    color: colors.primary_green_dark,
    textAlign: "center",
    marginBottom: "2rem",
  },

  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
  },

  codeInput: {
    width: "3rem",
    height: "3.5rem",
    borderWidth: "0.0625rem",
    borderColor: colors.emphasis_gray,
    borderRadius: "0.625rem",
    textAlign: "center",
    fontSize: "1.25rem",
    backgroundColor: colors.white_full,
    marginHorizontal: "0.375rem",
  },

  verifyButtonWrapper: {
    width: "100%",
    paddingHorizontal: "1.875rem",
    marginTop: "1.25rem",
  },
});
