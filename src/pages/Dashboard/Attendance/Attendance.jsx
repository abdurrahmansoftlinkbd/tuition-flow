import { useEffect, useMemo, useState } from "react";

import { Link, useSearchParams } from "react-router";

import { useStudents } from "../../../context/StudentContext";
import { useAttendance } from "../../../context/AttendanceContext";

const getLocalDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDate = (dateString) => {
  if (!dateString) return "";

  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const Attendance = () => {
  const { students } = useStudents();

  const [searchParams] = useSearchParams();

  const queryDate = searchParams.get("date");

  const { getAttendanceByDate, saveAttendance } = useAttendance();

  const [selectedDate, setSelectedDate] = useState(queryDate || getLocalDate());

  const [search, setSearch] = useState("");

  const [classFilter, setClassFilter] = useState("All");

  const [attendanceMap, setAttendanceMap] = useState({});

  const [noteMap, setNoteMap] = useState({});

  const [isSaving, setIsSaving] = useState(false);

  const [saved, setSaved] = useState(false);

  const activeStudents = useMemo(() => {
    return students
      .filter((student) => student.status === "Active")
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [students]);

  const classes = useMemo(() => {
    return [...new Set(activeStudents.map((student) => student.classLevel))];
  }, [activeStudents]);

  /*
   * Load saved attendance whenever
   * selected date changes.
   */
  useEffect(() => {
    const records = getAttendanceByDate(selectedDate);

    const statusMap = {};
    const notes = {};

    records.forEach((record) => {
      statusMap[record.studentId] = record.status;

      notes[record.studentId] = record.note || "";
    });

    setAttendanceMap(statusMap);
    setNoteMap(notes);
    setSaved(false);
  }, [selectedDate, getAttendanceByDate]);

  const filteredStudents = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return activeStudents.filter((student) => {
      const matchesSearch =
        !searchValue ||
        student.name.toLowerCase().includes(searchValue) ||
        student.phone.toLowerCase().includes(searchValue) ||
        student.subject.toLowerCase().includes(searchValue);

      const matchesClass =
        classFilter === "All" || student.classLevel === classFilter;

      return matchesSearch && matchesClass;
    });
  }, [activeStudents, search, classFilter]);

  const presentCount = filteredStudents.filter(
    (student) => attendanceMap[student.id] === "Present",
  ).length;

  const absentCount = filteredStudents.filter(
    (student) => attendanceMap[student.id] === "Absent",
  ).length;

  const notMarkedCount = filteredStudents.length - presentCount - absentCount;

  const setStatus = (studentId, status) => {
    setAttendanceMap((previous) => ({
      ...previous,
      [studentId]: status,
    }));

    setSaved(false);
  };

  const handleNoteChange = (studentId, note) => {
    setNoteMap((previous) => ({
      ...previous,
      [studentId]: note,
    }));

    setSaved(false);
  };

  const markAll = (status) => {
    const updated = {};

    filteredStudents.forEach((student) => {
      updated[student.id] = status;
    });

    setAttendanceMap((previous) => ({
      ...previous,
      ...updated,
    }));

    setSaved(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(false);

    const records = activeStudents.map((student) => ({
      studentId: student.id,
      status: attendanceMap[student.id] || "Absent",
      note: noteMap[student.id] || "",
    }));

    saveAttendance(selectedDate, records);

    await new Promise((resolve) => setTimeout(resolve, 300));

    setIsSaving(false);
    setSaved(true);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Attendance
          </h2>

          <p className="mt-2 text-sm text-base-content/60">
            Mark and manage your students' daily attendance.
          </p>
        </div>

        <Link to="/dashboard/attendance/history" className="btn btn-outline">
          View History
        </Link>
      </div>

      {/* Date & Controls */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-end">
          {/* Date */}
          <div>
            <label
              htmlFor="attendance-date"
              className="mb-2 block text-sm font-medium"
            >
              Attendance Date
            </label>

            <input
              id="attendance-date"
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              className="input input-bordered w-full"
            />

            <p className="mt-2 text-xs text-base-content/50">
              {formatDate(selectedDate)}
            </p>
          </div>

          {/* Class */}
          <div>
            <label
              htmlFor="class-filter"
              className="mb-2 block text-sm font-medium"
            >
              Class
            </label>

            <select
              id="class-filter"
              value={classFilter}
              onChange={(event) => setClassFilter(event.target.value)}
              className="select select-bordered w-full lg:w-48"
            >
              <option value="All">All Classes</option>

              {classes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label
              htmlFor="student-search"
              className="mb-2 block text-sm font-medium"
            >
              Search
            </label>

            <label className="input input-bordered flex items-center gap-2 lg:w-64">
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
                id="student-search"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="grow"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/50">Present</p>

          <p className="mt-2 text-2xl font-bold text-success">{presentCount}</p>

          <p className="mt-1 text-xs text-base-content/50">
            Students marked present
          </p>
        </div>

        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/50">Absent</p>

          <p className="mt-2 text-2xl font-bold text-error">{absentCount}</p>

          <p className="mt-1 text-xs text-base-content/50">
            Students marked absent
          </p>
        </div>

        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/50">Not Marked</p>

          <p className="mt-2 text-2xl font-bold">
            {Math.max(notMarkedCount, 0)}
          </p>

          <p className="mt-1 text-xs text-base-content/50">
            Attendance not recorded
          </p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col justify-between gap-3 border-b border-base-200 p-4 sm:flex-row sm:items-center sm:p-5">
          <div>
            <h3 className="font-semibold">Student Attendance</h3>

            <p className="mt-1 text-xs text-base-content/50">
              {filteredStudents.length} students displayed
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => markAll("Present")}
              className="btn btn-success btn-sm"
            >
              Mark All Present
            </button>

            <button
              type="button"
              onClick={() => markAll("Absent")}
              className="btn btn-outline btn-error btn-sm"
            >
              Mark All Absent
            </button>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="px-5 py-20 text-center">
            <h3 className="font-semibold">No students found</h3>

            <p className="mt-1 text-sm text-base-content/50">
              Try changing your search or class filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Note</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => {
                  const currentStatus = attendanceMap[student.id];

                  return (
                    <tr key={student.id}>
                      <td>
                        <Link
                          to={`/dashboard/students/${student.id}`}
                          className="hover:text-primary"
                        >
                          <p className="font-semibold">{student.name}</p>

                          <p className="text-xs text-base-content/50">
                            {student.phone}
                          </p>
                        </Link>
                      </td>

                      <td>
                        <span className="text-sm">{student.classLevel}</span>
                      </td>

                      <td>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setStatus(student.id, "Present")}
                            className={`btn btn-sm ${
                              currentStatus === "Present"
                                ? "btn-success"
                                : "btn-outline"
                            }`}
                          >
                            Present
                          </button>

                          <button
                            type="button"
                            onClick={() => setStatus(student.id, "Absent")}
                            className={`btn btn-sm ${
                              currentStatus === "Absent"
                                ? "btn-error"
                                : "btn-outline"
                            }`}
                          >
                            Absent
                          </button>
                        </div>
                      </td>

                      <td>
                        <input
                          type="text"
                          value={noteMap[student.id] || ""}
                          onChange={(event) =>
                            handleNoteChange(student.id, event.target.value)
                          }
                          placeholder="Optional note"
                          className="input input-bordered input-sm w-48"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Save */}
        <div className="flex flex-col justify-between gap-4 border-t border-base-200 p-4 sm:flex-row sm:items-center sm:p-5">
          <div>
            {saved ? (
              <p className="text-sm font-medium text-success">
                Attendance saved successfully.
              </p>
            ) : (
              <p className="text-xs text-base-content/50">
                Unmarked students will be saved as absent.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="btn btn-primary px-6"
          >
            {isSaving ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Saving...
              </>
            ) : (
              "Save Attendance"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
