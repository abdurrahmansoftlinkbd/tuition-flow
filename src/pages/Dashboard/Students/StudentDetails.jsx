import { Link, useNavigate, useParams } from "react-router";
import { useStudents } from "../../../context/StudentContext";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getStudentById, deleteStudent } = useStudents();

  const student = getStudentById(id);

  if (!student) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-base-200 bg-base-100 p-10 text-center shadow-sm">
          <h2 className="text-xl font-bold">Student not found</h2>

          <p className="mt-2 text-sm text-base-content/50">
            The student you are looking for does not exist.
          </p>

          <Link to="/dashboard/students" className="btn btn-primary mt-6">
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  const initials = student.name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`,
    );

    if (!confirmed) return;

    deleteStudent(student.id);

    navigate("/dashboard/students", {
      replace: true,
    });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Breadcrumb */}
      <div className="breadcrumbs p-0 text-sm">
        <ul>
          <li>
            <Link to="/dashboard/students">Students</Link>
          </li>

          <li>{student.name}</li>
        </ul>
      </div>

      {/* Profile Header */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm sm:p-7">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="avatar placeholder">
              <div className="w-16 rounded-full bg-primary text-primary-content sm:w-20">
                <span className="text-lg font-bold sm:text-xl">{initials}</span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  {student.name}
                </h2>

                <span
                  className={`badge ${
                    student.status === "Active"
                      ? "badge-success"
                      : "badge-ghost"
                  }`}
                >
                  {student.status}
                </span>
              </div>

              <p className="mt-1 text-sm text-base-content/50">
                {student.classLevel} · {student.subject}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              to={`/dashboard/students/${student.id}/edit`}
              className="btn btn-outline"
            >
              Edit Student
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-ghost text-error"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Personal Information */}
        <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm lg:col-span-2">
          <div className="border-b border-base-200 px-5 py-4">
            <h3 className="font-semibold">Student Information</h3>
          </div>

          <div className="grid gap-x-8 gap-y-6 p-5 sm:grid-cols-2">
            <div>
              <p className="text-xs text-base-content/50">Phone Number</p>

              <p className="mt-1 text-sm font-medium">{student.phone}</p>
            </div>

            <div>
              <p className="text-xs text-base-content/50">Email</p>

              <p className="mt-1 text-sm font-medium">
                {student.email || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-xs text-base-content/50">Guardian</p>

              <p className="mt-1 text-sm font-medium">{student.guardianName}</p>
            </div>

            <div>
              <p className="text-xs text-base-content/50">Joining Date</p>

              <p className="mt-1 text-sm font-medium">{student.joinedDate}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs text-base-content/50">Address</p>

              <p className="mt-1 text-sm font-medium">
                {student.address || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Tuition */}
        <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm">
          <div className="border-b border-base-200 px-5 py-4">
            <h3 className="font-semibold">Tuition Details</h3>
          </div>

          <div className="space-y-5 p-5">
            <div>
              <p className="text-xs text-base-content/50">Monthly Fee</p>

              <p className="mt-1 text-2xl font-bold text-primary">
                ৳{Number(student.monthlyFee).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-base-content/50">Subject</p>

              <p className="mt-1 text-sm font-medium">{student.subject}</p>
            </div>

            <div>
              <p className="text-xs text-base-content/50">Class</p>

              <p className="mt-1 text-sm font-medium">{student.classLevel}</p>
            </div>

            <div>
              <p className="text-xs text-base-content/50">Class Time</p>

              <p className="mt-1 text-sm font-medium">
                {student.preferredTime || "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm">
        <div className="border-b border-base-200 px-5 py-4">
          <h3 className="font-semibold">Class Schedule</h3>
        </div>

        <div className="flex flex-wrap gap-2 p-5">
          {student.days.map((day) => (
            <span key={day} className="badge badge-outline px-4 py-3">
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Notes */}
      {student.notes && (
        <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm">
          <div className="border-b border-base-200 px-5 py-4">
            <h3 className="font-semibold">Notes</h3>
          </div>

          <p className="p-5 text-sm leading-7 text-base-content/70">
            {student.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
