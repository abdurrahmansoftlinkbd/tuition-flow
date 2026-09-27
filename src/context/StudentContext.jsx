import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "./AuthContext";

const StudentContext = createContext(null);

const getStorageKey = (uid) => {
  return `tuitionflow-students-${uid}`;
};

const demoStudents = [
  {
    id: "student-1",
    name: "Nafisa Rahman",
    phone: "01712345678",
    email: "nafisa@example.com",
    classLevel: "Class 10",
    subject: "Mathematics",
    monthlyFee: 1500,
    days: ["Sunday", "Tuesday", "Thursday"],
    preferredTime: "6:00 PM",
    guardianName: "Md. Rahman",
    address: "Kandirpar, Cumilla",
    status: "Active",
    joinedDate: "2026-01-10",
    notes: "Preparing for SSC examination.",
  },
  {
    id: "student-2",
    name: "Sakib Hasan",
    phone: "01812345678",
    email: "sakib@example.com",
    classLevel: "Class 9",
    subject: "Physics",
    monthlyFee: 2000,
    days: ["Monday", "Wednesday", "Friday"],
    preferredTime: "7:00 PM",
    guardianName: "Abdul Hasan",
    address: "Jhautola, Cumilla",
    status: "Active",
    joinedDate: "2026-02-05",
    notes: "",
  },
  {
    id: "student-3",
    name: "Tanjim Ahmed",
    phone: "01912345678",
    email: "tanjim@example.com",
    classLevel: "Class 8",
    subject: "Mathematics",
    monthlyFee: 1500,
    days: ["Sunday", "Tuesday"],
    preferredTime: "9:00 PM",
    guardianName: "Karim Ahmed",
    address: "Race Course, Cumilla",
    status: "Active",
    joinedDate: "2026-03-12",
    notes: "Needs additional practice in algebra.",
  },
  {
    id: "student-4",
    name: "Maliha Islam",
    phone: "01612345678",
    email: "maliha@example.com",
    classLevel: "Class 7",
    subject: "General Mathematics",
    monthlyFee: 1500,
    days: ["Saturday", "Monday", "Wednesday"],
    preferredTime: "5:30 PM",
    guardianName: "Abul Islam",
    address: "Tomchom Bridge, Cumilla",
    status: "Active",
    joinedDate: "2026-04-08",
    notes: "",
  },
  {
    id: "student-5",
    name: "Rafiul Karim",
    phone: "01512345678",
    email: "rafiul@example.com",
    classLevel: "Class 9",
    subject: "Mathematics",
    monthlyFee: 1800,
    days: ["Sunday", "Tuesday", "Thursday"],
    preferredTime: "8:00 PM",
    guardianName: "M. Karim",
    address: "Shashongacha, Cumilla",
    status: "Inactive",
    joinedDate: "2026-02-18",
    notes: "Currently taking a temporary break.",
  },
  {
    id: "student-6",
    name: "Samia Akter",
    phone: "01312345678",
    email: "samia@example.com",
    classLevel: "Class 6",
    subject: "Mathematics",
    monthlyFee: 1200,
    days: ["Saturday", "Monday"],
    preferredTime: "4:30 PM",
    guardianName: "Ruhul Akter",
    address: "Police Line, Cumilla",
    status: "Active",
    joinedDate: "2026-05-20",
    notes: "",
  },
];

const StudentProvider = ({ children }) => {
  const { user } = useAuth();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setStudents([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const storageKey = getStorageKey(user.uid);
    const storedStudents = localStorage.getItem(storageKey);

    if (storedStudents) {
      try {
        setStudents(JSON.parse(storedStudents));
      } catch (error) {
        console.error("Failed to parse stored students:", error);

        setStudents(demoStudents);
        localStorage.setItem(storageKey, JSON.stringify(demoStudents));
      }
    } else {
      setStudents(demoStudents);
      localStorage.setItem(storageKey, JSON.stringify(demoStudents));
    }

    setLoading(false);
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid || loading) return;

    const storageKey = getStorageKey(user.uid);

    localStorage.setItem(storageKey, JSON.stringify(students));
  }, [students, user?.uid, loading]);

  const addStudent = (studentData) => {
    const newStudent = {
      ...studentData,
      id: crypto.randomUUID(),
      joinedDate:
        studentData.joinedDate || new Date().toISOString().split("T")[0],
    };

    setStudents((previous) => [newStudent, ...previous]);

    return newStudent;
  };

  const getStudentById = (id) => {
    return students.find((student) => student.id === id);
  };

  const updateStudent = (id, updatedData) => {
    setStudents((previous) =>
      previous.map((student) =>
        student.id === id
          ? {
              ...student,
              ...updatedData,
            }
          : student,
      ),
    );
  };

  const deleteStudent = (id) => {
    setStudents((previous) => previous.filter((student) => student.id !== id));
  };

  const value = {
    students,
    loading,
    addStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("useStudents must be used inside StudentProvider");
  }

  return context;
};

export default StudentProvider;
