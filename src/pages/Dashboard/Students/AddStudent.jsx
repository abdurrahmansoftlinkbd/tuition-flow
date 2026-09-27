import { Link, useNavigate } from "react-router";
import StudentForm from "../../../components/students/StudentForm";
import { useStudents } from "../../../context/StudentContext";

const AddStudent = () => {
  const navigate = useNavigate();
  const { addStudent } = useStudents();

  const handleSubmit = (studentData) => {
    const newStudent = addStudent(studentData);

    navigate(`/dashboard/students/${newStudent.id}`, {
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

          <li>Add Student</li>
        </ul>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Add Student
        </h2>

        <p className="mt-2 text-sm text-base-content/60">
          Add a new student to your tuition records.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm sm:p-8">
        <StudentForm onSubmit={handleSubmit} submitText="Add Student" />
      </div>
    </div>
  );
};

export default AddStudent;
