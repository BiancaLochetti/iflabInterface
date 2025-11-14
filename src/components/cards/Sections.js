import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../../colors";
import { FinishSession, DeleteSession } from "../../api/SectionsRequests";

export function Sections({
  session_id,
  inicio,
  fim,
  materiaisReservados,
  elementosReservados,
  labName,
  formDone,
  statusText,
  canFinish = false,
  canDelete = false,
  onFinished,
  onDeleted,
}) {
  const [showBox, setShowBox] = useState(false);

  const handleArrowPress = () => {
    setShowBox(!showBox);
  };

  const handleFinish = async () => {
    try {
      const result = await FinishSession(session_id);
      console.log(result);
      if (!result || !result.status) {
        alert("Erro ao finalizar sessão: " + (result?.msg || "erro desconhecido"));
        return;
      }
      alert("Sessão finalizada!");
      setShowBox(false);
      if (typeof onFinished === "function") onFinished(session_id);
    } catch (err) {
      alert("Erro ao finalizar sessão: " + err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await DeleteSession(session_id);
      if (!result || !result.status) {
        alert("Erro ao cancelar sessão: " + (result?.msg || "erro desconhecido"));
        return;
      }
      alert("Sessão cancelada!");
      setShowBox(false);
      if (typeof onDeleted === "function") onDeleted(session_id);
    } catch (err) {
      alert("Erro ao cancelar sessão: " + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleFree}>
          {inicio} até {fim}
        </Text>
        {canFinish || canDelete? (
          <TouchableOpacity onPress={handleArrowPress}>
            <Image
              source={require("../../assets/icons/UI/down.png")}
              style={styles.downIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {showBox && (canFinish || canDelete) && (
        <View style={styles.finishBox}>
          {canFinish ? (
            <TouchableOpacity style={{ paddingVertical: 6 }} onPress={handleFinish}>
              <Text style={styles.finishText}>Finalizar sessão</Text>
            </TouchableOpacity>
          ) : null}

          {canDelete ? (
            <TouchableOpacity style={{ paddingVertical: 6 }} onPress={handleDelete}>
              <Text style={styles.finishText}>Cancelar sessão</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      )}
      <View>
        <Text style={styles.TextFont}>
          {elementosReservados} elementos reservados
        </Text>
        <Text style={styles.TextFont}>
          {materiaisReservados} equipamentos reservados
        </Text>
        {labName && <Text style={styles.TextFont}>Laboratório: {labName}</Text>}
        {formDone !== undefined && (
          <Text style={styles.TextFont}>
            Formulário: {formDone ? "Preenchido" : "Pendente"}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(245,245,245,1)",
    padding: "0.9375rem", // 15px
    borderRadius: "1rem", // 16px
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "0.625rem", // 10px
    fontFamily: "Inter-Regular",
  },

  titleFree: {
    fontSize: "1rem", // 16px
    fontWeight: "normal",
    fontFamily: "Inter",
    flex: 1,
    textAlign: "left",
  },

  TextFont: {
    fontSize: "0.875rem", // 14px
    fontWeight: "normal",
    fontFamily: "Inter",
    color: colors.contrastant_gray,
  },

  downIcon: {
    width: "1.5rem", // 24px
    height: "1.5rem", // 24px
    marginLeft: "0.5rem", // 8px
  },

  finishBox: {
    position: "absolute",
    top: "3.125rem", // 50px
    right: "1.25rem", // 20px
    backgroundColor: colors.white_full,
    paddingVertical: "0.625rem", 
    paddingHorizontal: "1rem", 
    borderRadius: "0.5rem", 
    shadowColor: colors.input_text_gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 0.25, 
    elevation: 5,
    zIndex: 10,
  },

  finishText: {
    color: colors.primary_text_gray,
    fontWeight: "bold",
    fontSize: "1rem", 
    textAlign: "center",
  },
});
