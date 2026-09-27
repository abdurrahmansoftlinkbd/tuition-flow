import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStudents } from "../../../context/StudentContext";
import { useAttendance } from "../../../context/AttendanceContext";

const formatDate = (dateString) => {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const AttendanceHistory = () => {
  const navigate = useNavigate();

  const { students } = useStudents();
  const { attendance } = useAttendance();

  const [selectedStudent, setSelectedStudent] = useState("All");

  const history = useMemo(() => {
    const activeStudentIds = new Set(students.map((student) => student.id));

    const grouped = {};

    attendance
      .filter((record) => activeStudentIds.has(record.studentId))
      .forEach((record) => {
        if (!grouped[record.date]) {
          grouped[record.date] = {
            date: record.date,
            present: 0,
            absent: 0,
            total: 0,
          };
        }

        grouped[record.date].total += 1;

        if (record.status === "Present") {
          grouped[record.date].present += 1;
        }

        if (record.status === "Absent") {
          grouped[record.date].absent += 1;
        }
      });

    return Object.values(grouped).sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
  }, [attendance, students]);

  const studentHistory = useMemo(() => {
    if (selectedStudent === "All") {
      return [];
    }

    return attendance
      .filter((record) => record.studentId === selectedStudent)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [attendance, selectedStudent]);

  const selectedStudentObject = students.find(
    (student) => student.id === selectedStudent,
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Attendance History
          </h2>

          <p className="mt-2 text-sm text-base-content/60">
            Review previous attendance records.
          </p>
        </div>

        <Link to="/dashboard/attendance" className="btn btn-primary">
          Mark Attendance
        </Link>
      </div>

      {/* Daily History */}
      <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm">
        <div className="border-b border-base-200 px-5 py-4">
          <h3 className="font-semibold">Daily Attendance</h3>

          <p className="mt-1 text-xs text-base-content/50">
            Attendance records grouped by date.
          </p>
        </div>

        {history.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="font-semibold">No attendance history</h3>

            <p className="mt-1 text-sm text-base-content/50">
              Save your first attendance record to see it here.
            </p>

            <Link
              to="/dashboard/attendance"
              className="btn btn-primary btn-sm mt-4"
            >
              Mark Attendance
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Marked</th>
                  <th>Attendance Rate</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {history.map((day) => {
                  const rate =
                    day.total > 0
                      ? Math.round((day.present / day.total) * 100)
                      : 0;

                  return (
                    <tr key={day.date}>
                      <td className="font-medium">{formatDate(day.date)}</td>

                      <td>
                        <span className="badge badge-success badge-sm">
                          {day.present}
                        </span>
                      </td>

                      <td>
                        <span className="badge badge-error badge-sm">
                          {day.absent}
                        </span>
                      </td>

                      <td>{day.total}</td>

                      <td>
                        <div className="flex items-center gap-3">
                          <progress
                            className="progress progress-primary w-24"
                            value={rate}
                            max="100"
                          />

                          <span className="text-sm font-semibold">{rate}%</span>
                        </div>
                      </td>

                      <td>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/dashboard/attendance?date=${day.date}`)
                            }
                            className="btn btn-ghost btn-sm"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student History */}
      <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm">
        <div className="border-b border-base-200 p-5">
          <h3 className="font-semibold">Student Attendance</h3>

          <p className="mt-1 text-xs text-base-content/50">
            View attendance history for an individual student.
          </p>

          <div className="mt-4 max-w-md">
            <select
              value={selectedStudent}
              onChange={(event) => setSelectedStudent(event.target.value)}
              className="select select-bordered w-full"
            >
              <option value="All">Select a student</option>

              {students
                .filter((student) => student.status === "Active")
                .map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {selectedStudent === "All" ? (
          <div className="p-10 text-center">
            <p className="text-sm text-base-content/50">
              Select a student to view their attendance history.
            </p>
          </div>
        ) : (
          <>
            {/* Student Summary */}
            <div className="grid gap-4 border-b border-base-200 p-5 sm:grid-cols-3">
              <div>
                <p className="text-xs text-base-content/50">Student</p>

                <p className="mt-1 font-semibold">
                  {selectedStudentObject?.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-base-content/50">Total Classes</p>

                <p className="mt-1 text-xl font-bold">
                  {studentHistory.length}
                </p>
              </div>

              <div>
                <p className="text-xs text-base-content/50">Attendance Rate</p>

                <p className="mt-1 text-xl font-bold text-primary">
                  {studentHistory.length > 0
                    ? Math.round(
                        (studentHistory.filter(
                          (record) => record.status === "Present",
                        ).length /
                          studentHistory.length) *
                          100,
                      )
                    : 0}
                  %
                </p>
              </div>
            </div>

            {studentHistory.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-sm text-base-content/50">
                  No attendance records found for this student.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Note</th>
                    </tr>
                  </thead>

                  <tbody>
                    {studentHistory.map((record) => (
                      <tr key={record.id}>
                        <td className="font-medium">
                          {formatDate(record.date)}
                        </td>

                        <td>
                          <span
                            className={`badge badge-sm ${
                              record.status === "Present"
                                ? "badge-success"
                                : "badge-error"
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>

                        <td className="text-sm text-base-content/60">
                          {record.note || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AttendanceHistory;
