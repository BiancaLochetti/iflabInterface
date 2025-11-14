import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./styles";

import { DataSelection } from "../../components/cards/DataSelection";
import { Sections } from "../../components/cards/Sections";

import { ListUserSessions } from "../../api/SectionsRequests";

export function Calendar() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [runningSessions, setRunningSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [closedSessions, setClosedSessions] = useState([]);

  const [finalizedIds, setFinalizedIds] = useState([]);
  const [dateFilter, setDateFilter] = useState({ year: null, month: null, day: null });

  const [showAllRunning, setShowAllRunning] = useState(false);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllClosed, setShowAllClosed] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function refreshSessions() {
      setLoading(true);
      try {
        const res = await ListUserSessions();

        let items = [];
        if (Array.isArray(res)) items = res;
        else if (res && Array.isArray(res.sessions)) items = res.sessions;
        else if (res && Array.isArray(res.sessionsList)) items = res.sessionsList;
        else if (res && Array.isArray(res.sessions_list)) items = res.sessions_list;
        else if (res && Array.isArray(res.data)) items = res.data;
        else if (res && Array.isArray(res.result)) items = res.result;

        function normalizeTime(t) {
          if (!t) return "00:00";
          const parts = String(t).split(":");
          return parts.slice(0, 2).join(":");
        }

        function removeDiacritics(raw) {
          if (!raw) return "";
          try {
            return String(raw).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
          } catch (e) {
            return String(raw).toLowerCase();
          }
        }

        const normalized = (items || []).map((s) => {
          const sessionId = s.sessionId || s.session_id || s.id || s._id;
          const sessionStatus = s.sessionStatus || s.status || s._status || "";
          return {
            ...s,
            sessionId,
            date: s.date || s.session_date || s.sessionDate || s.dateOnly || null,
            startsAt: normalizeTime(s.startsAt || s.starts_at || s.session_starts_at || s.startAt),
            endsAt: normalizeTime(s.endsAt || s.ends_at || s.session_ends_at || s.endAt),
            sessionStatus: sessionStatus,
            _status: removeDiacritics(sessionStatus),
            elementsQtd: s.elementsQtd || (Array.isArray(s.elements_list) ? s.elements_list.length : 0),
            equipmentsQtd: s.equipmentsQtd || (Array.isArray(s.equipments_list) ? s.equipments_list.length : 0),
            labName: s.labName || s.lab_name || (s.lab && s.lab.name) || null,
            formDone: s.formDone || s.form_done || false,
            finalizada:
              (finalizedIds || []).map(String).includes(String(sessionId)) ||
              (removeDiacritics(sessionStatus).includes("finaliz") || removeDiacritics(sessionStatus).includes("encerr") || removeDiacritics(sessionStatus).includes("cancel") || removeDiacritics(sessionStatus).includes("conclu")),
          };
        });

        if (mounted) setSessions(normalized);
      } catch (err) {
        console.error("refreshSessions error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    refreshSessions();
    return () => (mounted = false);
  }, [finalizedIds]);

  useEffect(() => {
    function normalizeStatus(raw) {
      if (!raw) return "";
      try {
        return raw.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
      } catch (e) {
        return String(raw).toLowerCase();
      }
    }

    function categorize(sessionsList) {
      const running = [];
      const upcoming = [];
      const closed = [];

      sessionsList.forEach((s) => {
        if (s.finalizada) {
          closed.push(s);
          return;
        }

        const rawStatus = s._status || s.sessionStatus || s.status || "";
        const st = normalizeStatus(rawStatus);

        if (st && (st.includes("finaliz") || st.includes("encerr") || st.includes("cancel") || st.includes("conclu"))) {
          closed.push(s);
          return;
        }

        if (st && (st.includes("andament") || st === "andamento" || st === "em andamento")) {
          running.push(s);
          return;
        }

        if (st && (st.includes("agend") || st === "agendada" || st === "agendado")) {
          upcoming.push(s);
          return;
        }

        upcoming.push(s);
      });

      return { running, upcoming, closed };
    }

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
        const isoMatch = String(sessionDateStr).match(/^(\d{4})-(\d{2})-(\d{2})/);
        let y, m, d;
        if (isoMatch) {
          y = isoMatch[1];
          m = isoMatch[2];
          d = isoMatch[3];
        } else {
          const parsed = new Date(sessionDateStr);
          if (isNaN(parsed)) return false;
          y = String(parsed.getFullYear());
          m = String(parsed.getMonth() + 1).padStart(2, "0");
          d = String(parsed.getDate()).padStart(2, "0");
        }

        if (year && String(year) !== String(y)) return false;
        if (month) {
          const mStr = monthsMap[month] || month;
          if (String(mStr).padStart(2, "0") !== String(m).padStart(2, "0")) return false;
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

    running.sort((a, b) => toStartDate(a) - toStartDate(b));
    upcoming.sort((a, b) => toStartDate(a) - toStartDate(b));
    closed.sort((a, b) => toStartDate(b) - toStartDate(a));

    setRunningSessions(running);
    setUpcomingSessions(upcoming);
    setClosedSessions(closed);
  }, [sessions, dateFilter]);

  function handleFinished(sessionId) {
    setSessions((prev) => prev.map((s) => {
      const id = s.sessionId || s.session_id || s.id;
      if (String(id) === String(sessionId)) return { ...s, finalizada: true };
      return s;
    }));
    setFinalizedIds((prev) => {
      if (prev.map(String).includes(String(sessionId))) return prev;
      return [...prev, sessionId];
    });
  }

  function handleDeleted(sessionId) {
    setSessions((prev) => prev.map((s) => {
      const id = s.sessionId || s.session_id || s.id;
      if (String(id) === String(sessionId)) return { ...s, finalizada: true };
      return s;
    }));
    setFinalizedIds((prev) => {
      if (prev.map(String).includes(String(sessionId))) return prev;
      return [...prev, sessionId];
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ textAlign: "center", fontSize: 16 }}>Calendário</Text>
      </View>

      <ScrollView>
        <View style={styles.dataView}>
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.textFont, { marginBottom: 10 }]}>Selecione a Data:</Text>
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
          onFinished={handleFinished}
        />

        <SectionListBlock
          title="Próximas sessões"
          sessions={upcomingSessions}
          loading={loading}
          expanded={showAllUpcoming}
          setExpanded={setShowAllUpcoming}
          canFinish={false}
          canDelete={true}
          onDeleted={handleDeleted}
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

function SectionListBlock({ title, sessions, loading, expanded, setExpanded, canFinish = false, canDelete = false, onFinished, onDeleted }) {
  return (
    <View style={{ zIndex: -1 }}>
      <View style={{ marginBottom: 5 }}>
        <Text style={[styles.textFont, { marginBottom: 10 }]}>{title}:</Text>
        {loading ? (
          <Text style={styles.loadingText}>Carregando...</Text>
        ) : sessions.length === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Text style={styles.loadingText}>{title === "Sessões em andamento" ? "Nenhuma sessão reservada" : `Não há ${title.toLowerCase()}`}</Text>
          </View>
        ) : (
          <>
            {(() => {
              const shown = expanded ? sessions : sessions.slice(0, 2);
              return (
                <ScrollView style={{ maxHeight: expanded ? 800 : 300 }} nestedScrollEnabled={true}>
                  {shown.map((session, idx) => (
                    <View key={idx} style={styles.sessionWrapper}>
                      <Sections
                        session_id={session.sessionId || session.session_id || session.id}
                        inicio={session.startsAt}
                        fim={session.endsAt}
                        dataSessão={session.date}
                        materiaisReservados={session.equipmentsQtd}
                        elementosReservados={session.elementsQtd}
                        labName={session.labName}
                        formDone={session.formDone}
                        statusText={session.sessionStatus || session._status}
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
              <TouchableOpacity onPress={() => setExpanded(true)} style={styles.showAllButton}>
                <Text style={styles.showAllText}>Ver todas as sessões</Text>
              </TouchableOpacity>
            ) : null}

            {expanded ? (
              <TouchableOpacity onPress={() => setExpanded(false)} style={styles.showAllButton}>
                <Text style={styles.showAllText}>Ver menos</Text>
              </TouchableOpacity>
            ) : null}
          </>
        )}
      </View>
    </View>
  );
}
