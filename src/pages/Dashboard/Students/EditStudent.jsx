import { Link, useNavigate, useParams } from "react-router";

import StudentForm from "../../../components/students/StudentForm";
import { useStudents } from "../../../context/StudentContext";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getStudentById, updateStudent } = useStudents();

  const student = getStudentById(id);

  if (!student) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-base-200 bg-base-100 p-10 text-center shadow-sm">
          <h2 className="text-xl font-bold">Student not found</h2>

          <Link to="/dashboard/students" className="btn btn-primary mt-6">
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (studentData) => {
    updateStudent(id, studentData);

    navigate(`/dashboard/students/${id}`, {
      replace: true,
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Breadcrumb */}
      <div className="breadcrumbs p-0 text-sm">
        <ul>
          <li>
            <Link to="/dashboard/students">Students</Link>
          </li>

          <li>
            <Link to={`/dashboard/students/${id}`}>{student.name}</Link>
          </li>

          <li>Edit</li>
        </ul>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Edit Student
        </h2>

        <p className="mt-2 text-sm text-base-content/60">
          Update {student.name}'s information.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm sm:p-8">
        <StudentForm
          initialData={student}
          onSubmit={handleSubmit}
          submitText="Update Student"
        />
      </div>
    </div>
  );
};

export default EditStudent;
