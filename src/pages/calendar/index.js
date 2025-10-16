// Calendar page (clean single implementation)
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";

import { DataSelection } from "../../components/cards/DataSelection";
import { Sections } from "../../components/cards/Sections";

import { ListUserSessions } from "../../api/SectionsRequests";

import colors from "../../colors";
export function Calendar() {
  // vetor das sessões
  const [sessions, setSessions] = useState([]);
  // estado de carregamento
  const [loading, setLoading] = useState(true);
  // listas categorizadas
  const [runningSessions, setRunningSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [closedSessions, setClosedSessions] = useState([]);
  // ids de sessões marcadas localmente como finalizadas/canceladas
  const [finalizedIds, setFinalizedIds] = useState([]);
  // filtro de data vindo do DataSelection
  const [dateFilter, setDateFilter] = useState({
    year: null,
    month: null,
    day: null,
  });
  // estados para mostrar todas as sessões
  const [showAllRunning, setShowAllRunning] = useState(false);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllClosed, setShowAllClosed] = useState(false);

  useEffect(() => {
    async function refreshSessions() {
      setLoading(true);
      const result = await ListUserSessions();
      if (result && result.sessionsList) {
        const newSessions = result.sessionsList.map((s) => {
          // formata a hora para não mostrar os segundos
          const copy = { ...s };
          const id = copy.sessionId || copy.session_id || copy.id;
          if (id && finalizedIds.map(String).includes(String(id)))
            copy.finalizada = true;
          if (typeof copy.startsAt === "string")
            copy.startsAt = copy.startsAt.replace(/(\d{2}:\d{2}):\d{2}/g, "$1");
          if (typeof copy.endsAt === "string")
            copy.endsAt = copy.endsAt.replace(/(\d{2}:\d{2}):\d{2}/g, "$1");
          return copy;
        });
        setSessions(newSessions);
      } else {
        setSessions([]);
      }
      setLoading(false);
    }
    refreshSessions();
  }, []);

  // Filtro das sessões pelo status data e hora
  // Recomputar as listas categorizadas sempre que `sessions` mudar.
  // gambiarra iminente
  useEffect(() => {
    function categorize(sessionsList) {
      const now = new Date();

      // ajudante para obter uma Data e hora de uma sessão separadamente (HH:MM)
      function toDateTime(sessionDateStr, timeStr) {
        const dateParts = String(sessionDateStr).split("-");
        if (dateParts.length !== 3) return null;
        const [y, m, d] = dateParts.map((p) => parseInt(p, 10));
        const timeParts = String(timeStr || "").split(":");
        const hh = parseInt(timeParts[0] || "0", 10);
        const mm = parseInt(timeParts[1] || "0", 10);
        return new Date(y, m - 1, d, hh, mm, 0, 0);
      }

      const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      );

      const running = [];
      const upcoming = [];
      const closed = [];

      sessionsList.forEach((s) => {
        // se marcada localmente como finalizada/cancelada, considerar encerrada
        if (s.finalizada) {
          closed.push(s);
          return;
        }
        const sessionDateStr = s.date || s.session_date || "";
        const startStr =
          s.startsAt || s.startAt || s.session_starts_at || "00:00";
        const endStr = s.endsAt || s.endAt || s.session_ends_at || "00:00";

        const parts = String(sessionDateStr).split("-");
        if (parts.length !== 3) {
          // data inválida, considerar como futura por padrão
          upcoming.push(s);
          return;
        }

        const sessionDay = new Date(
          parseInt(parts[0], 10),
          parseInt(parts[1], 10) - 1,
          parseInt(parts[2], 10),
          0,
          0,
          0,
          0
        );

        const startDT = toDateTime(sessionDateStr, startStr);
        const endDT = toDateTime(sessionDateStr, endStr);

        if (sessionDay.getTime() < today.getTime()) {
          closed.push(s);
        } else if (sessionDay.getTime() === today.getTime()) {
          if (startDT && endDT && now >= startDT && now <= endDT) {
            running.push(s);
          } else if (endDT && now > endDT) {
            closed.push(s);
          } else {
            upcoming.push(s);
          }
        } else {
          upcoming.push(s);
        }
      });

      return { running, upcoming, closed };
    }
    // fim da gambiarra
    // aplica o filtro de data, se houver (suporta 'YYYY-MM-DD' e ISO like 'YYYY-MM-DDT...')
    let filtered = sessions || [];
    const { year, month, day } = dateFilter || {};
    if (year || month || day) {
      const monthsMap = {
        Janeiro: "01",
        Fevereiro: "02",
        Março: "03",
        Abril: "04",
        Maio: "05",
        Junho: "06",
        Julho: "07",
        Agosto: "08",
        Setembro: "09",
        Outubro: "10",
        Novembro: "11",
        Dezembro: "12",
      };

      filtered = filtered.filter((s) => {
        const sessionDateStr = s.date || s.session_date || "";

        // try YYYY-MM-DD at start (covers '2025-09-03' and '2025-09-03T03:00:00')
        const isoMatch = String(sessionDateStr).match(
          /^(\d{4})-(\d{2})-(\d{2})/
        );
        let y, m, d;
        if (isoMatch) {
          y = isoMatch[1];
          m = isoMatch[2];
          d = isoMatch[3];
        } else {
          // fallback: try Date parsing
          const parsed = new Date(sessionDateStr);
          if (isNaN(parsed)) return false;
          y = String(parsed.getFullYear());
          m = String(parsed.getMonth() + 1).padStart(2, "0");
          d = String(parsed.getDate()).padStart(2, "0");
        }

        if (year && String(year) !== String(y)) return false;
        if (month) {
          const mStr = monthsMap[month] || month;
          if (String(mStr).padStart(2, "0") !== String(m).padStart(2, "0"))
            return false;
        }
        if (day && String(day) !== String(parseInt(d, 10))) return false;
        return true;
      });
    }

    const { running, upcoming, closed } = categorize(filtered || []);

    function toStartDate(s) {
      const sd = s.date || s.session_date || "";
      const st = s.startsAt || s.startAt || s.session_starts_at || "00:00";
      const parts = String(sd).split("-");
      if (parts.length !== 3) return new Date(0);
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const d = parseInt(parts[2], 10);
      const tp = String(st).split(":");
      const hh = parseInt(tp[0] || "0", 10);
      const mm = parseInt(tp[1] || "0", 10);
      return new Date(y, m, d, hh, mm, 0, 0);
    }

    // em andamento e próximas: crescente pela data e hora de início
    running.sort((a, b) => toStartDate(a) - toStartDate(b));
    upcoming.sort((a, b) => toStartDate(a) - toStartDate(b));
    // terminadas: decrescente pela data e hora de início (mais recentes primeiro)
    closed.sort((a, b) => toStartDate(b) - toStartDate(a));

    setRunningSessions(running);
    setUpcomingSessions(upcoming);
    setClosedSessions(closed);
  }, [sessions, dateFilter]);

  useEffect(() => {}, [dateFilter]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          {/* <TouchableOpacity
            style={{ position: "absolute", left: 0 }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("../../assets/icons/UI/chevrom.png")}
              style={{
                tintColor: colors.contrastant_gray,
                width: 30,
                height: 30,
                transform: [{ rotate: "90deg" }],
              }}
              resizeMode="contain"
            />
          </TouchableOpacity> */}
          <Text style={{ textAlign: "center", fontSize: 16 }}>Calendário</Text>
        </View>

      <ScrollView>
        <View style={styles.dataView}>
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.textFont, { marginBottom: 10 }]}>
              Selecione a Data:
            </Text>
          </View>
          <View style={{ width: "100%" }}>
            <DataSelection onChange={(d) => setDateFilter(d)} />
          </View>
        </View>

        <SectionListBlock
          title="Sessões em andamento"
          sessions={runningSessions}
          loading={loading}
          expanded={showAllRunning}
          setExpanded={setShowAllRunning}
          canFinish={true}
          canDelete={false}
          onFinished={(sessionId) => {
            setSessions((prev) =>
              prev.map((s) => {
                const id = s.sessionId || s.session_id || s.id;
                if (String(id) === String(sessionId))
                  return { ...s, finalizada: true };
                return s;
              })
            );
            setFinalizedIds((prev) => {
              if (prev.map(String).includes(String(sessionId))) return prev;
              return [...prev, sessionId];
            });
          }}
        />

        <SectionListBlock
          title="Próximas sessões"
          sessions={upcomingSessions}
          loading={loading}
          expanded={showAllUpcoming}
          setExpanded={setShowAllUpcoming}
          canFinish={false}
          canDelete={true}
          onDeleted={(sessionId) => {
            setSessions((prev) =>
              prev.map((s) => {
                const id = s.sessionId || s.session_id || s.id;
                if (String(id) === String(sessionId))
                  return { ...s, finalizada: true };
                return s;
              })
            );
            setFinalizedIds((prev) => {
              if (prev.map(String).includes(String(sessionId))) return prev;
              return [...prev, sessionId];
            });
          }}
        />

        <SectionListBlock
          title="Sessões encerradas"
          sessions={closedSessions}
          loading={loading}
          expanded={showAllClosed}
          setExpanded={setShowAllClosed}
          canFinish={false}
          canDelete={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionListBlock({
  title,
  sessions,
  loading,
  expanded,
  setExpanded,
  canFinish = false,
  canDelete = false,
  onFinished,
  onDeleted,
}) {
  return (
    <View style={{ zIndex: -1 }}>
      <View style={{ marginBottom: 5}}>
        <Text style={[styles.textFont, { marginBottom: 10 }]}>{title}:</Text>
        {loading ? (
          <Text style={styles.loadingText}>Carregando...</Text>
        ) : sessions.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text style={styles.loadingText}>
              {title === "Sessões em andamento"
                ? "Nenhuma sessão reservada"
                : `Não há ${title.toLowerCase()}`}
            </Text>
          </View>
        ) : (
          <>
            {(() => {
              const shown = expanded ? sessions : sessions.slice(0, 2);
              return (
                <ScrollView
                  style={{ maxHeight: expanded ? 800 : 300 }}
                  nestedScrollEnabled={true}
                >
                  {shown.map((session, idx) => (
                    <View key={idx} style={styles.sessionWrapper}>
                      <Sections
                        session_id={
                          session.sessionId || session.session_id || session.id
                        }
                        inicio={session.startsAt}
                        fim={session.endsAt}
                        dataSessão={session.date}
                        materiaisReservados={session.equipmentsQtd}
                        elementosReservados={session.elementsQtd}
                        labName={session.labName}
                        formDone={session.formDone}
                        canFinish={canFinish}
                        canDelete={canDelete}
                        onFinished={onFinished}
                        onDeleted={onDeleted}
                      />
                    </View>
                  ))}
                </ScrollView>
              );
            })()}

            {!expanded && sessions.length > 2 ? (
              <TouchableOpacity
                onPress={() => setExpanded(true)}
                style={styles.showAllButton}
              >
                <Text style={styles.showAllText}>Ver todas as sessões</Text>
              </TouchableOpacity>
            ) : null}

            {expanded ? (
              <TouchableOpacity
                onPress={() => setExpanded(false)}
                style={styles.showAllButton}
              >
                <Text style={styles.showAllText}>Ver menos</Text>
              </TouchableOpacity>
            ) : null}
          </>
        )}
      </View>
    </View>
  );
}
