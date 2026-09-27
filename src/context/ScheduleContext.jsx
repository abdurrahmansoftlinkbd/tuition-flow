import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { useAuth } from "./AuthContext";
import { useStudents } from "./StudentContext";

const ScheduleContext = createContext(null);

const getStorageKey = (uid) => {
  return `tuitionflow-schedules-${uid}`;
};

const demoSchedules = [
  {
    id: "schedule-1",
    studentId: "student-1",
    subject: "Mathematics",
    days: ["Sunday", "Tuesday", "Thursday"],
    startTime: "18:00",
    duration: 60,
    location: "Student's Home",
    notes: "SSC mathematics preparation.",
    status: "Active",
  },
  {
    id: "schedule-2",
    studentId: "student-2",
    subject: "Physics",
    days: ["Monday", "Wednesday", "Friday"],
    startTime: "19:00",
    duration: 60,
    location: "Online",
    notes: "",
    status: "Active",
  },
  {
    id: "schedule-3",
    studentId: "student-3",
    subject: "Mathematics",
    days: ["Sunday", "Tuesday"],
    startTime: "21:00",
    duration: 60,
    location: "Student's Home",
    notes: "Focus on algebra.",
    status: "Active",
  },
  {
    id: "schedule-4",
    studentId: "student-4",
    subject: "General Mathematics",
    days: ["Saturday", "Monday", "Wednesday"],
    startTime: "17:30",
    duration: 60,
    location: "Online",
    notes: "",
    status: "Active",
  },
];

const ScheduleProvider = ({ children }) => {
  const { user } = useAuth();
  const { students } = useStudents();

  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setSchedules([]);
      setLoading(false);
      return;
    }

    const storageKey = getStorageKey(user.uid);

    try {
      const storedSchedules = localStorage.getItem(storageKey);

      if (storedSchedules) {
        setSchedules(JSON.parse(storedSchedules));
      } else {
        setSchedules(demoSchedules);

        localStorage.setItem(storageKey, JSON.stringify(demoSchedules));
      }
    } catch (error) {
      console.error("Failed to load schedules:", error);

      setSchedules(demoSchedules);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid || loading) return;

    const storageKey = getStorageKey(user.uid);

    localStorage.setItem(storageKey, JSON.stringify(schedules));
  }, [schedules, user?.uid, loading]);

  const addSchedule = (scheduleData) => {
    const newSchedule = {
      id: crypto.randomUUID(),
      ...scheduleData,
    };

    setSchedules((previous) => [...previous, newSchedule]);

    return newSchedule;
  };

  const updateSchedule = (id, updatedData) => {
    setSchedules((previous) =>
      previous.map((schedule) =>
        schedule.id === id
          ? {
              ...schedule,
              ...updatedData,
            }
          : schedule,
      ),
    );
  };

  const deleteSchedule = (id) => {
    setSchedules((previous) =>
      previous.filter((schedule) => schedule.id !== id),
    );
  };

  const getScheduleById = (id) => {
    return schedules.find((schedule) => schedule.id === id);
  };

  const getStudentSchedules = (studentId) => {
    return schedules.filter((schedule) => schedule.studentId === studentId);
  };

  const enrichedSchedules = useMemo(() => {
    return schedules.map((schedule) => {
      const student = students.find((item) => item.id === schedule.studentId);

      return {
        ...schedule,
        studentName: student?.name || "Unknown Student",
        studentClass: student?.classLevel || "",
      };
    });
  }, [schedules, students]);

  const getSchedulesForDay = (day) => {
    return enrichedSchedules
      .filter(
        (schedule) =>
          schedule.status === "Active" && schedule.days.includes(day),
      )
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const todaySchedule = useMemo(() => {
    const today = new Date();

    const day = today.toLocaleDateString("en-US", {
      weekday: "long",
    });

    return getSchedulesForDay(day);
  }, [enrichedSchedules]);

  const getUpcomingSchedules = () => {
    const dayOrder = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const currentDayIndex = new Date().getDay();

    const currentDay = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });

    const result = [];

    for (let offset = 0; offset < 7; offset++) {
      const dayIndex = (currentDayIndex + offset) % 7;

      const dayName = dayOrder[dayIndex];

      const daySchedules = getSchedulesForDay(dayName);

      daySchedules.forEach((schedule) => {
        result.push({
          ...schedule,
          day: dayName,
          dayOffset: offset,
          isToday: dayName === currentDay && offset === 0,
        });
      });
    }

    return result;
  };

  const value = {
    schedules: enrichedSchedules,
    loading,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    getScheduleById,
    getStudentSchedules,
    getSchedulesForDay,
    todaySchedule,
    getUpcomingSchedules,
  };

  return (
    <ScheduleContext.Provider value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedules = () => {
  const context = useContext(ScheduleContext);

  if (!context) {
    throw new Error("useSchedules must be used inside ScheduleProvider");
  }

  return context;
};

export default ScheduleProvider;
