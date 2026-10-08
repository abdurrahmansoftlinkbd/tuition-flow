import { useMemo, useState } from "react";
import { Link } from "react-router";

import { usePayments } from "../../../context/PaymentContext";
import { useStudents } from "../../../context/StudentContext";
import TableSkeleton from "../../../components/skeletons/TableSkeleton";

const getCurrentMonth = () => {
  return new Date().toISOString().slice(0, 7);
};

const formatMonth = (month) => {
  if (!month) return "";

  const [year, monthNumber] = month.split("-");

  return new Date(Number(year), Number(monthNumber) - 1).toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    },
  );
};

const Payments = () => {
  const {
    payments,
    loading,
    monthlySummary,
    getStudentMonthlyPaidAmount,
    getStudentMonthlyStatus,
  } = usePayments();

  const { students } = useStudents();

  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const [statusFilter, setStatusFilter] = useState("All");

  const selectedMonthLabel = formatMonth(selectedMonth);

  const studentPaymentRows = useMemo(() => {
    return students
      .filter((student) => student.status === "Active")
      .map((student) => {
        const paid = getStudentMonthlyPaidAmount(student.id, selectedMonth);

        const fee = Number(student.monthlyFee) || 0;

        const due = Math.max(fee - paid, 0);

        const status = getStudentMonthlyStatus(student, selectedMonth);

        return {
          ...student,
          paid,
          due,
          fee,
          status,
        };
      });
  }, [
    students,
    selectedMonth,
    getStudentMonthlyPaidAmount,
    getStudentMonthlyStatus,
  ]);

  const filteredRows = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return studentPaymentRows.filter((student) => {
      const matchesSearch =
        !searchValue ||
        student.name.toLowerCase().includes(searchValue) ||
        student.phone.toLowerCase().includes(searchValue) ||
        student.subject.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [studentPaymentRows, search, statusFilter]);

  const selectedMonthSummary = useMemo(() => {
    const rows = studentPaymentRows;

    const expected = rows.reduce((total, student) => total + student.fee, 0);

    const collected = rows.reduce((total, student) => total + student.paid, 0);

    const due = Math.max(expected - collected, 0);

    const paidStudents = rows.filter(
      (student) => student.status === "Paid",
    ).length;

    const partialStudents = rows.filter(
      (student) => student.status === "Partial",
    ).length;

    const dueStudents = rows.filter(
      (student) => student.status === "Due",
    ).length;

    const percentage =
      expected > 0
        ? Math.min(Math.round((collected / expected) * 100), 100)
        : 0;

    return {
      expected,
      collected,
      due,
      paidStudents,
      partialStudents,
      dueStudents,
      percentage,
    };
  }, [studentPaymentRows]);

  const recentPayments = useMemo(() => {
    return [...payments]
      .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))
      .slice(0, 6)
      .map((payment) => {
        const student = students.find((item) => item.id === payment.studentId);

        return {
          ...payment,
          studentName:
            student?.name || payment.studentName || "Unknown Student",
        };
      });
  }, [payments, students]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Payments
          </h2>

          <p className="mt-2 text-sm text-base-content/60">
            Track monthly tuition collection and outstanding payments.
          </p>
        </div>

        <Link to="/dashboard/payments/add" className="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          Record Payment
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/50">Expected</p>

          <p className="mt-2 text-2xl font-bold">
            ৳{selectedMonthSummary.expected.toLocaleString()}
          </p>

          <p className="mt-2 text-xs text-base-content/50">
            {selectedMonthLabel}
          </p>
        </div>

        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/50">Collected</p>

          <p className="mt-2 text-2xl font-bold text-success">
            ৳{selectedMonthSummary.collected.toLocaleString()}
          </p>

          <p className="mt-2 text-xs text-base-content/50">
            {selectedMonthSummary.percentage}% collected
          </p>
        </div>

        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/50">Outstanding</p>

          <p className="mt-2 text-2xl font-bold text-warning">
            ৳{selectedMonthSummary.due.toLocaleString()}
          </p>

          <p className="mt-2 text-xs text-base-content/50">
            {selectedMonthSummary.dueStudents} students due
          </p>
        </div>

        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/50">Payment Status</p>

          <div className="mt-3 flex items-center gap-3">
            <span className="badge badge-success">
              {selectedMonthSummary.paidStudents} Paid
            </span>

            <span className="badge badge-warning">
              {selectedMonthSummary.partialStudents} Partial
            </span>
          </div>

          <p className="mt-3 text-xs text-base-content/50">
            {selectedMonthSummary.dueStudents} still due
          </p>
        </div>
      </div>

      {/* Collection Progress */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{selectedMonthLabel} Collection</h3>

            <p className="mt-1 text-xs text-base-content/50">
              Monthly tuition collection progress
            </p>
          </div>

          <span className="text-sm font-semibold text-primary">
            {selectedMonthSummary.percentage}%
          </span>
        </div>

        <progress
          className="progress progress-primary mt-5 w-full"
          value={selectedMonthSummary.percentage}
          max="100"
        />

        <div className="mt-4 flex justify-between text-sm">
          <span className="text-base-content/60">
            ৳{selectedMonthSummary.collected.toLocaleString()} collected
          </span>

          <span className="font-semibold">
            ৳{selectedMonthSummary.expected.toLocaleString()} expected
          </span>
        </div>
      </div>

      {/* Monthly Student Payment Status */}
      <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm">
        <div className="border-b border-base-200 p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-3">
            {/* Search */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-base-content/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="11" cy="11" r="7" />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 20l-4-4"
                />
              </svg>

              <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="grow"
              />
            </label>

            {/* Month */}
            <input
              type="month"
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
              className="input input-bordered w-full"
            />

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="select select-bordered w-full"
            >
              <option value="All">All Statuses</option>

              <option value="Paid">Paid</option>

              <option value="Partial">Partial</option>

              <option value="Due">Due</option>
            </select>
          </div>
        </div>

        {loading ? (
          <TableSkeleton rows={6} columns={6} />
        ) : filteredRows.length === 0 ? (
          <div className="px-5 py-20 text-center">
            <h3 className="font-semibold">No students found</h3>

            <p className="mt-1 text-sm text-base-content/50">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Monthly Fee</th>
                  <th>Paid</th>
                  <th>Due</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRows.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <Link
                        to={`/dashboard/students/${student.id}`}
                        className="hover:text-primary"
                      >
                        <p className="font-semibold">{student.name}</p>

                        <p className="text-xs text-base-content/50">
                          {student.classLevel} · {student.subject}
                        </p>
                      </Link>
                    </td>

                    <td className="font-medium">
                      ৳{student.fee.toLocaleString()}
                    </td>

                    <td className="font-semibold text-success">
                      ৳{student.paid.toLocaleString()}
                    </td>

                    <td
                      className={
                        student.due > 0
                          ? "font-semibold text-warning"
                          : "text-base-content/60"
                      }
                    >
                      ৳{student.due.toLocaleString()}
                    </td>

                    <td>
                      <span
                        className={`badge badge-sm ${
                          student.status === "Paid"
                            ? "badge-success"
                            : student.status === "Partial"
                              ? "badge-warning"
                              : "badge-error"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>

                    <td>
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/dashboard/students/${student.id}`}
                          className="btn btn-ghost btn-sm"
                        >
                          Details
                        </Link>

                        {student.status !== "Paid" && (
                          <Link
                            to={`/dashboard/payments/add?student=${student.id}`}
                            className="btn btn-primary btn-sm"
                          >
                            Pay
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm">
        <div className="flex items-center justify-between border-b border-base-200 px-5 py-4">
          <div>
            <h3 className="font-semibold">Recent Transactions</h3>

            <p className="mt-1 text-xs text-base-content/50">
              Latest recorded payments
            </p>
          </div>

          <Link
            to="/dashboard/payments/add"
            className="btn btn-ghost btn-sm text-primary"
          >
            Record Payment
          </Link>
        </div>

        {recentPayments.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-base-content/50">
              No payment transactions recorded yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Amount</th>
                  <th>Month</th>
                  <th>Date</th>
                  <th>Method</th>
                </tr>
              </thead>

              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="font-medium">{payment.studentName}</td>

                    <td className="font-semibold">
                      ৳{Number(payment.amount).toLocaleString()}
                    </td>

                    <td className="text-base-content/60">
                      {formatMonth(payment.month)}
                    </td>

                    <td className="text-base-content/60">
                      {payment.paymentDate}
                    </td>

                    <td>
                      <span className="badge badge-outline badge-sm">
                        {payment.method}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
