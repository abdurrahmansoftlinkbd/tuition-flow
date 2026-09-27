import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { useAuth } from "./AuthContext";
import { useStudents } from "./StudentContext";

const PaymentContext = createContext(null);

const getCurrentMonth = () => {
  return new Date().toISOString().slice(0, 7);
};

const getStorageKey = (uid) => {
  return `tuitionflow-payments-${uid}`;
};

const PaymentProvider = ({ children }) => {
  const { user } = useAuth();
  const { students } = useStudents();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setPayments([]);
      setLoading(false);
      return;
    }

    const storageKey = getStorageKey(user.uid);

    try {
      const storedPayments = localStorage.getItem(storageKey);

      if (storedPayments) {
        setPayments(JSON.parse(storedPayments));
      } else {
        setPayments([]);
        localStorage.setItem(storageKey, JSON.stringify([]));
      }
    } catch (error) {
      console.error("Failed to load payments:", error);

      setPayments([]);
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid || loading) return;

    const storageKey = getStorageKey(user.uid);

    localStorage.setItem(storageKey, JSON.stringify(payments));
  }, [payments, user?.uid, loading]);

  const addPayment = (paymentData) => {
    const newPayment = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...paymentData,
      amount: Number(paymentData.amount),
    };

    setPayments((previous) => [newPayment, ...previous]);

    return newPayment;
  };

  const deletePayment = (id) => {
    setPayments((previous) => previous.filter((payment) => payment.id !== id));
  };

  const getStudentPayments = (studentId, month = getCurrentMonth()) => {
    return payments.filter(
      (payment) => payment.studentId === studentId && payment.month === month,
    );
  };

  const getStudentMonthlyPaidAmount = (
    studentId,
    month = getCurrentMonth(),
  ) => {
    return getStudentPayments(studentId, month).reduce(
      (total, payment) => total + Number(payment.amount || 0),
      0,
    );
  };

  const getStudentMonthlyStatus = (student, month = getCurrentMonth()) => {
    const paidAmount = getStudentMonthlyPaidAmount(student.id, month);

    const monthlyFee = Number(student.monthlyFee) || 0;

    if (paidAmount >= monthlyFee && monthlyFee > 0) {
      return "Paid";
    }

    if (paidAmount > 0) {
      return "Partial";
    }

    return "Due";
  };

  const monthlySummary = useMemo(() => {
    const month = getCurrentMonth();

    const activeStudents = students.filter(
      (student) => student.status === "Active",
    );

    const expectedAmount = activeStudents.reduce(
      (total, student) => total + Number(student.monthlyFee || 0),
      0,
    );

    const collectedAmount = payments
      .filter((payment) => payment.month === month)
      .reduce((total, payment) => total + Number(payment.amount || 0), 0);

    const dueAmount = Math.max(expectedAmount - collectedAmount, 0);

    const paidStudents = activeStudents.filter(
      (student) => getStudentMonthlyStatus(student, month) === "Paid",
    ).length;

    const partialStudents = activeStudents.filter(
      (student) => getStudentMonthlyStatus(student, month) === "Partial",
    ).length;

    const dueStudents = activeStudents.filter(
      (student) => getStudentMonthlyStatus(student, month) === "Due",
    ).length;

    const collectionPercentage =
      expectedAmount > 0
        ? Math.min(Math.round((collectedAmount / expectedAmount) * 100), 100)
        : 0;

    return {
      month,
      expectedAmount,
      collectedAmount,
      dueAmount,
      paidStudents,
      partialStudents,
      dueStudents,
      collectionPercentage,
    };
  }, [payments, students]);

  const value = {
    payments,
    loading,
    addPayment,
    deletePayment,
    getStudentPayments,
    getStudentMonthlyPaidAmount,
    getStudentMonthlyStatus,
    monthlySummary,
  };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

export const usePayments = () => {
  const context = useContext(PaymentContext);

  if (!context) {
    throw new Error("usePayments must be used inside PaymentProvider");
  }

  return context;
};

export default PaymentProvider;
