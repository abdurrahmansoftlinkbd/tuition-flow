import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { useAuth } from "./AuthContext";
import { useStudents } from "./StudentContext";

const AttendanceContext = createContext(null);

const getStorageKey = (uid) => {
  return `tuitionflow-attendance-${uid}`;
};

const getLocalDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const AttendanceProvider = ({ children }) => {
  const { user } = useAuth();
  const { students } = useStudents();

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setAttendance([]);
      setLoading(false);
      return;
    }

    const storageKey = getStorageKey(user.uid);

    try {
      const storedAttendance = localStorage.getItem(storageKey);

      if (storedAttendance) {
        setAttendance(JSON.parse(storedAttendance));
      } else {
        setAttendance([]);
        localStorage.setItem(storageKey, JSON.stringify([]));
      }
    } catch (error) {
      console.error("Failed to load attendance:", error);

      setAttendance([]);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid || loading) return;

    const storageKey = getStorageKey(user.uid);

    localStorage.setItem(storageKey, JSON.stringify(attendance));
  }, [attendance, user?.uid, loading]);

  const saveAttendance = (date, attendanceRecords) => {
    setAttendance((previous) => {
      const updated = [...previous];

      attendanceRecords.forEach((record) => {
        const existingIndex = updated.findIndex(
          (item) => item.studentId === record.studentId && item.date === date,
        );

        const newRecord = {
          id:
            existingIndex >= 0
              ? updated[existingIndex].id
              : crypto.randomUUID(),

          studentId: record.studentId,
          date,
          status: record.status,
          note: record.note || "",
          updatedAt: new Date().toISOString(),
        };

        if (existingIndex >= 0) {
          updated[existingIndex] = newRecord;
        } else {
          updated.push(newRecord);
        }
      });

      return updated;
    });
  };

  const getAttendanceByDate = (date) => {
    return attendance.filter((item) => item.date === date);
  };

  const getStudentAttendance = (studentId) => {
    return attendance.filter((item) => item.studentId === studentId);
  };

  const getStudentAttendancePercentage = (studentId) => {
    const records = getStudentAttendance(studentId);

    if (records.length === 0) {
      return 0;
    }

    const presentCount = records.filter(
      (item) => item.status === "Present",
    ).length;

    return Math.round((presentCount / records.length) * 100);
  };

  const dailySummary = useMemo(() => {
    const today = getLocalDate();

    const todayRecords = getAttendanceByDate(today);

    const activeStudentIds = new Set(
      students
        .filter((student) => student.status === "Active")
        .map((student) => student.id),
    );

    const relevantRecords = todayRecords.filter((record) =>
      activeStudentIds.has(record.studentId),
    );

    const present = relevantRecords.filter(
      (record) => record.status === "Present",
    ).length;

    const absent = relevantRecords.filter(
      (record) => record.status === "Absent",
    ).length;

    const marked = relevantRecords.length;

    const totalActive = activeStudentIds.size;

    const notMarked = Math.max(totalActive - marked, 0);

    const percentage = marked > 0 ? Math.round((present / marked) * 100) : 0;

    return {
      totalActive,
      marked,
      present,
      absent,
      notMarked,
      percentage,
    };
  }, [attendance, students]);

  const value = {
    attendance,
    loading,
    saveAttendance,
    getAttendanceByDate,
    getStudentAttendance,
    getStudentAttendancePercentage,
    dailySummary,
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);

  if (!context) {
    throw new Error("useAttendance must be used inside AttendanceProvider");
  }

  return context;
};

export default AttendanceProvider;
