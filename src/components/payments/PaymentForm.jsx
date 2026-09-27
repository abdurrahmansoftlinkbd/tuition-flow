import { useMemo, useState } from "react";
import { useStudents } from "../../context/StudentContext";

const getCurrentMonth = () => {
  return new Date().toISOString().slice(0, 7);
};

const getCurrentDate = () => {
  return new Date().toISOString().slice(0, 10);
};

const PaymentForm = ({
  initialData = null,
  onSubmit,
  submitText = "Record Payment",
  isSubmitting = false,
}) => {
  const { students } = useStudents();

  const [formData, setFormData] = useState({
    studentId: initialData?.studentId || "",
    amount: initialData?.amount?.toString() || "",
    month: initialData?.month || getCurrentMonth(),
    paymentDate: initialData?.paymentDate || getCurrentDate(),
    method: initialData?.method || "Cash",
    reference: initialData?.reference || "",
    note: initialData?.note || "",
  });

  const [error, setError] = useState("");

  const activeStudents = useMemo(() => {
    return students.filter((student) => student.status === "Active");
  }, [students]);

  const selectedStudent = useMemo(() => {
    return students.find((student) => student.id === formData.studentId);
  }, [students, formData.studentId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!formData.studentId) {
      setError("Please select a student.");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      setError("Please enter a valid payment amount.");
      return;
    }

    if (!formData.month) {
      setError("Please select the tuition month.");
      return;
    }

    if (!formData.paymentDate) {
      setError("Please select a payment date.");
      return;
    }

    if (!formData.method) {
      setError("Please select a payment method.");
      return;
    }

    onSubmit({
      ...formData,
      amount: Number(formData.amount),
      studentName: selectedStudent?.name || "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Payment Information */}
      <section>
        <div className="mb-5">
          <h3 className="font-semibold">Payment Information</h3>

          <p className="mt-1 text-sm text-base-content/50">
            Record a tuition payment for one of your students.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Student */}
          <div className="md:col-span-2">
            <label
              htmlFor="studentId"
              className="mb-2 block text-sm font-medium"
            >
              Student
            </label>

            <select
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select student</option>

              {activeStudents.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} — {student.classLevel}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Payment Amount
            </label>

            <label className="input input-bordered flex w-full items-center gap-2">
              <span className="text-base-content/50">৳</span>

              <input
                id="amount"
                name="amount"
                type="number"
                min="1"
                value={formData.amount}
                onChange={handleChange}
                placeholder="1500"
                className="grow"
              />
            </label>
          </div>

          {/* Month */}
          <div>
            <label htmlFor="month" className="mb-2 block text-sm font-medium">
              Tuition Month
            </label>

            <input
              id="month"
              name="month"
              type="month"
              value={formData.month}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Payment Date */}
          <div>
            <label
              htmlFor="paymentDate"
              className="mb-2 block text-sm font-medium"
            >
              Payment Date
            </label>

            <input
              id="paymentDate"
              name="paymentDate"
              type="date"
              value={formData.paymentDate}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Method */}
          <div>
            <label htmlFor="method" className="mb-2 block text-sm font-medium">
              Payment Method
            </label>

            <select
              id="method"
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Cash">Cash</option>
              <option value="bKash">bKash</option>
              <option value="Nagad">Nagad</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Reference */}
          <div className="md:col-span-2">
            <label
              htmlFor="reference"
              className="mb-2 block text-sm font-medium"
            >
              Transaction Reference
              <span className="ml-1 text-xs text-base-content/40">
                (Optional)
              </span>
            </label>

            <input
              id="reference"
              name="reference"
              type="text"
              value={formData.reference}
              onChange={handleChange}
              placeholder="e.g. BK2398456"
              className="input input-bordered w-full"
            />
          </div>

          {/* Note */}
          <div className="md:col-span-2">
            <label htmlFor="note" className="mb-2 block text-sm font-medium">
              Note
              <span className="ml-1 text-xs text-base-content/40">
                (Optional)
              </span>
            </label>

            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Add any notes about this payment..."
              className="textarea textarea-bordered min-h-24 w-full"
            />
          </div>
        </div>
      </section>

      {/* Selected Student Summary */}
      {selectedStudent && (
        <>
          <div className="divider" />

          <section>
            <h3 className="font-semibold">Student Summary</h3>

            <div className="mt-4 rounded-xl border border-base-200 bg-base-200/30 p-5">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-base-content/50">Student</p>

                  <p className="mt-1 font-semibold">{selectedStudent.name}</p>
                </div>

                <div>
                  <p className="text-xs text-base-content/50">Monthly Fee</p>

                  <p className="mt-1 font-semibold">
                    ৳{Number(selectedStudent.monthlyFee).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-base-content/50">Class</p>

                  <p className="mt-1 font-semibold">
                    {selectedStudent.classLevel}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-error text-sm">
          <span>{error}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse justify-end gap-3 border-t border-base-200 pt-6 sm:flex-row">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="btn btn-ghost"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary px-6"
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-sm" />
              Saving...
            </>
          ) : (
            submitText
          )}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
