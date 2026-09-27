import { useMemo, useState } from "react";
import { Link } from "react-router";

import { useSchedules } from "../../../context/ScheduleContext";

const dayOptions = [
  "All",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const formatTime = (time) => {
  if (!time) return "";

  const [hours, minutes] = time.split(":");

  const date = new Date();

  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const Schedule = () => {
  const { schedules, loading, deleteSchedule } = useSchedules();

  const [selectedDay, setSelectedDay] = useState("All");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("Active");

  const [scheduleToDelete, setScheduleToDelete] = useState(null);

  const filteredSchedules = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return schedules
      .filter((schedule) => {
        const matchesDay =
          selectedDay === "All" || schedule.days.includes(selectedDay);

        const matchesStatus =
          statusFilter === "All" || schedule.status === statusFilter;

        const matchesSearch =
          !searchValue ||
          schedule.studentName.toLowerCase().includes(searchValue) ||
          schedule.subject.toLowerCase().includes(searchValue);

        return matchesDay && matchesStatus && matchesSearch;
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [schedules, selectedDay, statusFilter, search]);

  const activeSchedules = schedules.filter(
    (schedule) => schedule.status === "Active",
  );

  const totalWeeklyClasses = activeSchedules.reduce(
    (total, schedule) => total + schedule.days.length,
    0,
  );

  const totalStudents = new Set(
    activeSchedules.map((schedule) => schedule.studentId),
  ).size;

  const handleDelete = () => {
    if (!scheduleToDelete) return;

    deleteSchedule(scheduleToDelete.id);

    setScheduleToDelete(null);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Schedule
          </h2>

          <p className="mt-2 text-sm text-base-content/60">
            Manage your weekly tuition classes and upcoming sessions.
          </p>
        </div>

        <Link to="/dashboard/schedule/add" className="btn btn-primary">
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
          Add Class
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/50">Active Classes</p>

          <p className="mt-2 text-2xl font-bold">{activeSchedules.length}</p>

          <p className="mt-1 text-xs text-base-content/50">
            Recurring class schedules
          </p>
        </div>

        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/50">Weekly Sessions</p>

          <p className="mt-2 text-2xl font-bold">{totalWeeklyClasses}</p>

          <p className="mt-1 text-xs text-base-content/50">
            Total scheduled sessions
          </p>
        </div>

        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/50">Students Scheduled</p>

          <p className="mt-2 text-2xl font-bold">{totalStudents}</p>

          <p className="mt-1 text-xs text-base-content/50">
            Students with active schedules
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-4 shadow-sm sm:p-5">
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
              placeholder="Search student or subject..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="grow"
            />
          </label>

          {/* Day */}
          <select
            value={selectedDay}
            onChange={(event) => setSelectedDay(event.target.value)}
            className="select select-bordered w-full"
          >
            {dayOptions.map((day) => (
              <option key={day} value={day}>
                {day === "All" ? "All Days" : day}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="select select-bordered w-full"
          >
            <option value="Active">Active</option>

            <option value="Inactive">Inactive</option>

            <option value="All">All Statuses</option>
          </select>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm">
        <div className="border-b border-base-200 px-5 py-4">
          <h3 className="font-semibold">Weekly Schedule</h3>

          <p className="mt-1 text-xs text-base-content/50">
            {filteredSchedules.length} schedules found
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : filteredSchedules.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="font-semibold">No schedules found</h3>

            <p className="mt-1 text-sm text-base-content/50">
              Try changing your filters or add a new class.
            </p>

            <Link
              to="/dashboard/schedule/add"
              className="btn btn-primary btn-sm mt-4"
            >
              Add Class
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Days</th>
                  <th>Time</th>
                  <th>Duration</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredSchedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>
                      <Link
                        to={`/dashboard/students/${schedule.studentId}`}
                        className="hover:text-primary"
                      >
                        <p className="font-semibold">{schedule.studentName}</p>

                        <p className="text-xs text-base-content/50">
                          {schedule.studentClass}
                        </p>
                      </Link>
                    </td>

                    <td>
                      <span className="text-sm">{schedule.subject}</span>
                    </td>

                    <td>
                      <div className="flex max-w-36 flex-wrap gap-1">
                        {schedule.days.map((day) => (
                          <span
                            key={day}
                            className="badge badge-outline badge-sm"
                          >
                            {day.slice(0, 3)}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td>
                      <span className="whitespace-nowrap font-semibold">
                        {formatTime(schedule.startTime)}
                      </span>
                    </td>

                    <td>
                      <span className="text-sm text-base-content/70">
                        {schedule.duration} min
                      </span>
                    </td>

                    <td>
                      <span className="text-sm text-base-content/60">
                        {schedule.location || "—"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge badge-sm ${
                          schedule.status === "Active"
                            ? "badge-success"
                            : "badge-ghost"
                        }`}
                      >
                        {schedule.status}
                      </span>
                    </td>

                    <td>
                      <div className="flex justify-end gap-1">
                        <Link
                          to={`/dashboard/schedule/${schedule.id}/edit`}
                          className="btn btn-ghost btn-sm btn-square"
                          title="Edit schedule"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 20h9"
                            />

                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 3.5a2.12 2.12 0 013 3L8 18l-4 1 1-4 11.5-11.5z"
                            />
                          </svg>
                        </Link>

                        <button
                          type="button"
                          onClick={() => setScheduleToDelete(schedule)}
                          className="btn btn-ghost btn-sm btn-square text-error"
                          title="Delete schedule"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 6h18"
                            />

                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 6V4h8v2m-9 0l1 14h8l1-14M10 10v6m4-6v6"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {scheduleToDelete && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Delete Class Schedule</h3>

            <p className="mt-3 text-sm leading-6 text-base-content/60">
              Are you sure you want to delete the schedule for{" "}
              <strong className="text-base-content">
                {scheduleToDelete.studentName}
              </strong>
              ?
            </p>

            <div className="modal-action">
              <button
                type="button"
                onClick={() => setScheduleToDelete(null)}
                className="btn btn-ghost"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-error"
              >
                Delete Schedule
              </button>
            </div>
          </div>

          <button
            type="button"
            className="modal-backdrop"
            onClick={() => setScheduleToDelete(null)}
          >
            Close
          </button>
        </dialog>
      )}
    </div>
  );
};

export default Schedule;
