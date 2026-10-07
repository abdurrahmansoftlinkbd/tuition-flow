import { useMemo, useState } from "react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { format, parseISO, subMonths, startOfMonth } from "date-fns";

import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  CircleDollarSign,
  GraduationCap,
  Users,
  WalletCards,
} from "lucide-react";

import { useStudents } from "../../../context/StudentContext";

import { usePayments } from "../../../context/PaymentContext";

import { useAttendance } from "../../../context/AttendanceContext";

const Reports = () => {
  const { students } = useStudents();
  const { payments } = usePayments();

  const { attendance } = useAttendance();

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );

  const activeStudents = useMemo(() => {
    return students.filter((student) => student.status === "Active");
  }, [students]);

  /*
   * Monthly payment data
   */
  const monthlyPaymentData = useMemo(() => {
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const date = subMonths(startOfMonth(new Date()), i);

      const monthKey = format(date, "yyyy-MM");

      const monthPayments = payments.filter(
        (payment) => payment.month === monthKey,
      );

      const collected = monthPayments.reduce(
        (total, payment) => total + Number(payment.amount || 0),
        0,
      );

      const expected = activeStudents.reduce(
        (total, student) => total + Number(student.monthlyFee || 0),
        0,
      );

      months.push({
        month: format(date, "MMM"),
        fullMonth: format(date, "MMM yyyy"),
        collected,
        expected,
        due: Math.max(expected - collected, 0),
      });
    }

    return months;
  }, [payments, activeStudents]);

  /*
   * Attendance data for the last 6 months
   */
  const attendanceTrendData = useMemo(() => {
    const result = [];

    for (let i = 5; i >= 0; i--) {
      const date = subMonths(startOfMonth(new Date()), i);

      const year = date.getFullYear();

      const month = String(date.getMonth() + 1).padStart(2, "0");

      const monthPrefix = `${year}-${month}`;

      const monthlyRecords = attendance.filter((record) =>
        record.date.startsWith(monthPrefix),
      );

      const present = monthlyRecords.filter(
        (record) => record.status === "Present",
      ).length;

      const absent = monthlyRecords.filter(
        (record) => record.status === "Absent",
      ).length;

      const total = present + absent;

      const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

      result.push({
        month: format(date, "MMM"),
        present,
        absent,
        percentage,
      });
    }

    return result;
  }, [attendance]);

  /*
   * Selected month
   */
  const selectedMonthData = useMemo(() => {
    const monthPayments = payments.filter(
      (payment) => payment.month === selectedMonth,
    );

    const collected = monthPayments.reduce(
      (total, payment) => total + Number(payment.amount || 0),
      0,
    );

    const expected = activeStudents.reduce(
      (total, student) => total + Number(student.monthlyFee || 0),
      0,
    );

    const due = Math.max(expected - collected, 0);

    return {
      collected,
      expected,
      due,
      percentage:
        expected > 0
          ? Math.min(Math.round((collected / expected) * 100), 100)
          : 0,
    };
  }, [payments, activeStudents, selectedMonth]);

  /*
   * Payment status distribution
   */
  const paymentStatusData = useMemo(() => {
    let paid = 0;
    let partial = 0;
    let due = 0;

    activeStudents.forEach((student) => {
      const paidAmount = payments
        .filter(
          (payment) =>
            payment.studentId === student.id && payment.month === selectedMonth,
        )
        .reduce((total, payment) => total + Number(payment.amount || 0), 0);

      const fee = Number(student.monthlyFee || 0);

      if (paidAmount >= fee && fee > 0) {
        paid++;
      } else if (paidAmount > 0) {
        partial++;
      } else {
        due++;
      }
    });

    return [
      {
        name: "Paid",
        value: paid,
      },
      {
        name: "Partial",
        value: partial,
      },
      {
        name: "Due",
        value: due,
      },
    ].filter((item) => item.value > 0);
  }, [activeStudents, payments, selectedMonth]);

  /*
   * Class distribution
   */
  const classDistributionData = useMemo(() => {
    const distribution = {};

    activeStudents.forEach((student) => {
      const className = student.classLevel || "Other";

      distribution[className] = (distribution[className] || 0) + 1;
    });

    return Object.entries(distribution)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value);
  }, [activeStudents]);

  /*
   * Attendance performance
   */
  const attendancePerformance = useMemo(() => {
    return activeStudents
      .map((student) => {
        const records = attendance.filter(
          (record) => record.studentId === student.id,
        );

        const present = records.filter(
          (record) => record.status === "Present",
        ).length;

        const total = records.filter(
          (record) => record.status === "Present" || record.status === "Absent",
        ).length;

        const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

        return {
          id: student.id,
          name: student.name,
          percentage,
          present,
          total,
        };
      })
      .sort((a, b) => b.percentage - a.percentage);
  }, [activeStudents, attendance]);

  const topStudents = attendancePerformance.slice(0, 5);

  /*
   * Previous month comparison
   */
  const previousMonth = format(
    subMonths(startOfMonth(parseISO(`${selectedMonth}-01`)), 1),
    "yyyy-MM",
  );

  const previousMonthCollected = payments
    .filter((payment) => payment.month === previousMonth)
    .reduce((total, payment) => total + Number(payment.amount || 0), 0);

  const collectionChange =
    previousMonthCollected > 0
      ? Math.round(
          ((selectedMonthData.collected - previousMonthCollected) /
            previousMonthCollected) *
            100,
        )
      : selectedMonthData.collected > 0
        ? 100
        : 0;

  const selectedMonthLabel = format(
    parseISO(`${selectedMonth}-01`),
    "MMMM yyyy",
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Reports & Analytics
          </h2>

          <p className="mt-2 text-sm text-base-content/60">
            Understand your tuition collection, students, and attendance at a
            glance.
          </p>
        </div>

        <div>
          <label
            htmlFor="report-month"
            className="mb-2 block text-xs font-medium text-base-content/60"
          >
            Report Month
          </label>

          <input
            id="report-month"
            type="month"
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
            className="input input-bordered"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Collection */}
        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-base-content/50">Collection</p>

              <p className="mt-2 text-2xl font-bold">
                ৳{selectedMonthData.collected.toLocaleString()}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CircleDollarSign className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1 text-xs">
            {collectionChange >= 0 ? (
              <ArrowUp className="h-3.5 w-3.5 text-success" />
            ) : (
              <ArrowDown className="h-3.5 w-3.5 text-error" />
            )}

            <span
              className={collectionChange >= 0 ? "text-success" : "text-error"}
            >
              {Math.abs(collectionChange)}%
            </span>

            <span className="text-base-content/50">vs previous month</span>
          </div>
        </div>

        {/* Outstanding */}
        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-base-content/50">Outstanding</p>

              <p className="mt-2 text-2xl font-bold text-warning">
                ৳{selectedMonthData.due.toLocaleString()}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-warning/10 text-warning">
              <WalletCards className="h-6 w-6" />
            </div>
          </div>

          <p className="mt-4 text-xs text-base-content/50">
            {selectedMonthData.percentage}% of expected tuition collected
          </p>
        </div>

        {/* Students */}
        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-base-content/50">Active Students</p>

              <p className="mt-2 text-2xl font-bold">{activeStudents.length}</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </div>
          </div>

          <p className="mt-4 text-xs text-base-content/50">
            Currently active tuition students
          </p>
        </div>

        {/* Attendance */}
        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-base-content/50">Attendance</p>

              <p className="mt-2 text-2xl font-bold">
                {attendanceTrendData[attendanceTrendData.length - 1]
                  ?.percentage || 0}
                %
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CalendarDays className="h-6 w-6" />
            </div>
          </div>

          <p className="mt-4 text-xs text-base-content/50">
            Current month attendance rate
          </p>
        </div>
      </div>

      {/* Collection Trend */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h3 className="font-semibold">Collection Trend</h3>

          <p className="mt-1 text-xs text-base-content/50">
            Expected, collected, and outstanding tuition over the last six
            months.
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyPaymentData}>
              <defs>
                <linearGradient
                  id="collectionGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopOpacity={0.2} />

                  <stop offset="95%" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />

              <XAxis dataKey="month" tickLine={false} axisLine={false} />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `৳${value / 1000}k`}
              />

              <Tooltip
                formatter={(value) => `৳${Number(value).toLocaleString()}`}
              />

              <Legend />

              <Area
                type="monotone"
                dataKey="expected"
                name="Expected"
                stroke="currentColor"
                fill="transparent"
                strokeWidth={2}
              />

              <Area
                type="monotone"
                dataKey="collected"
                name="Collected"
                stroke="currentColor"
                fill="url(#collectionGradient)"
                strokeWidth={2}
              />

              <Area
                type="monotone"
                dataKey="due"
                name="Due"
                stroke="currentColor"
                fill="transparent"
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment Status */}
        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm sm:p-6">
          <div className="mb-4">
            <h3 className="font-semibold">Payment Status</h3>

            <p className="mt-1 text-xs text-base-content/50">
              Student payment status for {selectedMonthLabel}.
            </p>
          </div>

          {paymentStatusData.length === 0 ? (
            <div className="flex h-72 items-center justify-center text-sm text-base-content/50">
              No payment data available.
            </div>
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                  >
                    {paymentStatusData.map((entry) => (
                      <Cell key={entry.name} />
                    ))}
                  </Pie>

                  <Tooltip />

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Class Distribution */}
        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm sm:p-6">
          <div className="mb-4">
            <h3 className="font-semibold">Students by Class</h3>

            <p className="mt-1 text-xs text-base-content/50">
              Distribution of active students.
            </p>
          </div>

          {classDistributionData.length === 0 ? (
            <div className="flex h-72 items-center justify-center text-sm text-base-content/50">
              No student data available.
            </div>
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={classDistributionData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    opacity={0.3}
                  />

                  <XAxis dataKey="name" tickLine={false} axisLine={false} />

                  <YAxis
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip />

                  <Bar dataKey="value" name="Students" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Attendance Trend */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm sm:p-6">
        <div className="mb-6">
          <h3 className="font-semibold">Attendance Trend</h3>

          <p className="mt-1 text-xs text-base-content/50">
            Present and absent attendance over the last six months.
          </p>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceTrendData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />

              <XAxis dataKey="month" tickLine={false} axisLine={false} />

              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />

              <Tooltip />

              <Legend />

              <Bar dataKey="present" name="Present" radius={[5, 5, 0, 0]} />

              <Bar dataKey="absent" name="Absent" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Student Attendance */}
      <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm">
        <div className="border-b border-base-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-semibold">Student Attendance Performance</h3>

              <p className="mt-1 text-xs text-base-content/50">
                Highest attendance rates among active students.
              </p>
            </div>
          </div>
        </div>

        {topStudents.length === 0 ? (
          <div className="p-10 text-center text-sm text-base-content/50">
            No attendance records available.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Present</th>
                  <th>Total Classes</th>
                  <th>Attendance</th>
                </tr>
              </thead>

              <tbody>
                {topStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <p className="font-semibold">{student.name}</p>
                    </td>

                    <td>{student.present}</td>

                    <td>{student.total}</td>

                    <td>
                      <div className="flex items-center gap-3">
                        <progress
                          className="progress progress-primary w-28"
                          value={student.percentage}
                          max="100"
                        />

                        <span className="text-sm font-semibold">
                          {student.percentage}%
                        </span>
                      </div>
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

export default Reports;
