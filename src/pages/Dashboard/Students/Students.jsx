import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useStudents } from "../../../context/StudentContext";

const Students = () => {
  const { students, loading, deleteStudent } = useStudents();

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [studentToDelete, setStudentToDelete] = useState(null);

  const classes = useMemo(() => {
    return [...new Set(students.map((student) => student.classLevel))];
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        student.name.toLowerCase().includes(searchValue) ||
        student.phone.toLowerCase().includes(searchValue) ||
        student.subject.toLowerCase().includes(searchValue);

      const matchesClass =
        classFilter === "All" || student.classLevel === classFilter;

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [students, search, classFilter, statusFilter]);

  const handleDelete = () => {
    if (!studentToDelete) return;

    deleteStudent(studentToDelete.id);
    setStudentToDelete(null);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Students
          </h2>

          <p className="mt-2 text-sm text-base-content/60">
            Manage your students and their tuition information.
          </p>
        </div>

        <Link to="/dashboard/students/add" className="btn btn-primary">
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
          Add Student
        </Link>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/50">Total Students</p>

          <p className="mt-2 text-2xl font-bold">{students.length}</p>
        </div>

        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/50">Active Students</p>

          <p className="mt-2 text-2xl font-bold">
            {students.filter((student) => student.status === "Active").length}
          </p>
        </div>

        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <p className="text-sm text-base-content/50">Monthly Tuition</p>

          <p className="mt-2 text-2xl font-bold">
            ৳
            {students
              .filter((student) => student.status === "Active")
              .reduce(
                (total, student) => total + Number(student.monthlyFee || 0),
                0,
              )
              .toLocaleString()}
          </p>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm">
        {/* Filters */}
        <div className="border-b border-base-200 p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-3">
            {/* Search */}
            <label className="input input-bordered flex items-center gap-2 md:col-span-1">
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

            {/* Class */}
            <select
              value={classFilter}
              onChange={(event) => setClassFilter(event.target.value)}
              className="select select-bordered w-full"
            >
              <option value="All">All Classes</option>

              {classes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="select select-bordered w-full"
            >
              <option value="All">All Statuses</option>

              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : filteredStudents.length === 0 ? (
          /* Empty */
          <div className="px-5 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-base-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-base-content/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m7-10a4 4 0 100-8 4 4 0 000 8zm7 3a3 3 0 013 3v1"
                />
              </svg>
            </div>

            <h3 className="mt-4 font-semibold">No students found</h3>

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
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Monthly Fee</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <Link
                        to={`/dashboard/students/${student.id}`}
                        className="flex items-center gap-3"
                      >
                        <div className="avatar placeholder">
                          <div className="w-10 rounded-full bg-primary/10 text-primary">
                            <span className="text-xs font-semibold">
                              {getInitials(student.name)}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="font-semibold hover:text-primary">
                            {student.name}
                          </p>

                          <p className="text-xs text-base-content/50">
                            {student.phone}
                          </p>
                        </div>
                      </Link>
                    </td>

                    <td>
                      <span className="text-sm">{student.classLevel}</span>
                    </td>

                    <td>
                      <span className="text-sm text-base-content/70">
                        {student.subject}
                      </span>
                    </td>

                    <td>
                      <span className="font-semibold">
                        ৳{Number(student.monthlyFee).toLocaleString()}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge badge-sm ${
                          student.status === "Active"
                            ? "badge-success"
                            : "badge-ghost"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>

                    <td>
                      <div className="flex justify-end gap-1">
                        <Link
                          to={`/dashboard/students/${student.id}`}
                          className="btn btn-ghost btn-sm btn-square"
                          title="View student"
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
                              d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
                            />

                            <circle cx="12" cy="12" r="2.5" />
                          </svg>
                        </Link>

                        <Link
                          to={`/dashboard/students/${student.id}/edit`}
                          className="btn btn-ghost btn-sm btn-square"
                          title="Edit student"
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
                          onClick={() => setStudentToDelete(student)}
                          className="btn btn-ghost btn-sm btn-square text-error"
                          title="Delete student"
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

        {/* Result Count */}
        {!loading && filteredStudents.length > 0 && (
          <div className="border-t border-base-200 px-5 py-3 text-xs text-base-content/50">
            Showing {filteredStudents.length} of {students.length} students
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {studentToDelete && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Delete Student</h3>

            <p className="mt-3 text-sm leading-6 text-base-content/60">
              Are you sure you want to delete{" "}
              <strong className="text-base-content">
                {studentToDelete.name}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="modal-action">
              <button
                type="button"
                onClick={() => setStudentToDelete(null)}
                className="btn btn-ghost"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-error"
              >
                Delete Student
              </button>
            </div>
          </div>

          <button
            type="button"
            className="modal-backdrop"
            onClick={() => setStudentToDelete(null)}
          >
            Close
          </button>
        </dialog>
      )}
    </div>
  );
};

export default Students;
