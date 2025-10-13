// Calendar page (clean single implementation)
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";

import { DataSelection } from "../../components/cards/DataSelection";
import { Sections } from "../../components/cards/Sections";

import { ListUserSessions } from "../../api/SectionsRequests";

export function Calendar() {
  // vetor das sessões
  const [sessions, setSessions] = useState([]);
  // estado de carregamento
  const [loading, setLoading] = useState(true);
  // listas categorizadas
  const [runningSessions, setRunningSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [closedSessions, setClosedSessions] = useState([]);
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
    async function UserSessions() {
      setLoading(true);
      const result = await ListUserSessions();
      if (result && result.sessionsList) {
        const newSessions = result.sessionsList.map((s) => {
          // formata a hora para não mostrar os segundos
          const copy = { ...s };
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
    UserSessions();
  }, []);

  // Filtro das sessões pelo status data e hora
  // Recomputar as listas categorizadas sempre que `sessions` mudar.
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

    // aplica o filtro de data, se houver
    let filtered = sessions || [];
    const { year, month, day } = dateFilter || {};
    if (year || month || day) {
      filtered = filtered.filter((s) => {
        const sessionDateStr = s.date || s.session_date || "";
        const parts = String(sessionDateStr).split("-");
        if (parts.length !== 3) return false;
        const [y, m, d] = parts;
        if (year && String(year) !== String(y)) return false;
        if (month) {
          const months = {
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
          const mStr = months[month] || month;
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerView}>
          <TouchableOpacity>
            <Image
              source={require("../../assets/icons/UI/chevrom.png")}
              style={styles.chevronImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            Calendário do laboratório{" "}
            <Text style={{ fontWeight: "bold" }}>A108</Text>
          </Text>
        </View>

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
        />

        <SectionListBlock
          title="Próximas sessões"
          sessions={upcomingSessions}
          loading={loading}
          expanded={showAllUpcoming}
          setExpanded={setShowAllUpcoming}
        />

        <SectionListBlock
          title="Sessões encerradas"
          sessions={closedSessions}
          loading={loading}
          expanded={showAllClosed}
          setExpanded={setShowAllClosed}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionListBlock({ title, sessions, loading, expanded, setExpanded }) {
  return (
    <View style={{ zIndex: -1 }}>
      <View style={{ marginBottom: 5, marginRight: 20 }}>
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
                    <Sections
                      key={session.sessionId || idx}
                      inicio={session.startsAt}
                      fim={session.endsAt}
                      dataSessão={session.date}
                      materiaisReservados={session.equipmentsQtd}
                      elementosReservados={session.elementsQtd}
                      labName={session.labName}
                      formDone={session.formDone}
                    />
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
