import { Link, useNavigate, useSearchParams } from "react-router-dom";

import PaymentForm from "../../../components/payments/PaymentForm";
import { usePayments } from "../../../context/PaymentContext";
import { useStudents } from "../../../context/StudentContext";

const AddPayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { addPayment } = usePayments();
  const { getStudentById } = useStudents();

  const studentId = searchParams.get("student");

  const selectedStudent = studentId ? getStudentById(studentId) : null;

  const handleSubmit = (paymentData) => {
    addPayment(paymentData);

    navigate("/dashboard/payments", {
      replace: true,
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Breadcrumb */}
      <div className="breadcrumbs p-0 text-sm">
        <ul>
          <li>
            <Link to="/dashboard/payments">Payments</Link>
          </li>

          <li>Record Payment</li>
        </ul>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Record Payment
        </h2>

        <p className="mt-2 text-sm text-base-content/60">
          Record a tuition payment for a student.
        </p>
      </div>

      {/* Selected Student Notice */}
      {selectedStudent && (
        <div className="alert border border-primary/10 bg-primary/5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="9" />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01"
            />
          </svg>

          <span>
            Recording a payment for <strong>{selectedStudent.name}</strong>.
          </span>
        </div>
      )}

      {/* Form */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm sm:p-8">
        <PaymentForm
          initialData={
            selectedStudent
              ? {
                  studentId: selectedStudent.id,
                }
              : null
          }
          onSubmit={handleSubmit}
          submitText="Record Payment"
        />
      </div>
    </div>
  );
};

export default AddPayment;
