import { useEffect, useState } from "react";
import { useStudents } from "../../context/StudentContext";

const defaultForm = {
  studentId: "",
  subject: "",
  days: [],
  startTime: "",
  duration: "60",
  location: "",
  notes: "",
  status: "Active",
};

const dayOptions = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const subjectOptions = [
  "Mathematics",
  "General Mathematics",
  "Physics",
  "Chemistry",
  "English",
  "Bangla",
  "ICT",
  "Other",
];

const ScheduleForm = ({
  initialData = null,
  onSubmit,
  submitText = "Add Schedule",
  isSubmitting = false,
}) => {
  const { students } = useStudents();

  const [formData, setFormData] = useState(defaultForm);

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...defaultForm,
        ...initialData,
        days: initialData.days || [],
        duration: initialData.duration?.toString() || "60",
      });
    }
  }, [initialData]);

  const activeStudents = students.filter(
    (student) => student.status === "Active",
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleDayChange = (day) => {
    setFormData((previous) => {
      const exists = previous.days.includes(day);

      return {
        ...previous,
        days: exists
          ? previous.days.filter((item) => item !== day)
          : [...previous.days, day],
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!formData.studentId) {
      setError("Please select a student.");
      return;
    }

    if (!formData.subject) {
      setError("Please select a subject.");
      return;
    }

    if (formData.days.length === 0) {
      setError("Please select at least one class day.");
      return;
    }

    if (!formData.startTime) {
      setError("Please select a class time.");
      return;
    }

    if (!formData.duration || Number(formData.duration) <= 0) {
      setError("Please enter a valid duration.");
      return;
    }

    onSubmit({
      ...formData,
      duration: Number(formData.duration),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Class Information */}
      <section>
        <div className="mb-5">
          <h3 className="font-semibold">Class Information</h3>

          <p className="mt-1 text-sm text-base-content/50">
            Choose the student and subject for this scheduled class.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Student */}
          <div>
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

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-medium">
              Subject
            </label>

            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select subject</option>

              {subjectOptions.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Time */}
          <div>
            <label
              htmlFor="startTime"
              className="mb-2 block text-sm font-medium"
            >
              Start Time
            </label>

            <input
              id="startTime"
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="duration"
              className="mb-2 block text-sm font-medium"
            >
              Duration
            </label>

            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="30">30 minutes</option>

              <option value="45">45 minutes</option>

              <option value="60">1 hour</option>

              <option value="90">1 hour 30 minutes</option>

              <option value="120">2 hours</option>

              <option value="150">2 hours 30 minutes</option>

              <option value="180">3 hours</option>
            </select>
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium"
            >
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Student's Home, Online, Tutor's Home"
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Days */}
      <section>
        <div className="mb-5">
          <h3 className="font-semibold">Class Days</h3>

          <p className="mt-1 text-sm text-base-content/50">
            Select all days on which this class regularly takes place.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {dayOptions.map((day) => {
            const selected = formData.days.includes(day);

            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDayChange(day)}
                className={`btn btn-sm ${
                  selected ? "btn-primary" : "btn-outline"
                }`}
              >
                {day.slice(0, 3)}
              </button>
            );
          })}
        </div>

        {formData.days.length > 0 && (
          <p className="mt-3 text-xs text-base-content/50">
            Selected: {formData.days.join(", ")}
          </p>
        )}
      </section>

      <div className="divider" />

      {/* Additional Information */}
      <section>
        <div className="mb-5">
          <h3 className="font-semibold">Additional Information</h3>
        </div>

        <div className="grid gap-5">
          {/* Status */}
          <div>
            <label htmlFor="status" className="mb-2 block text-sm font-medium">
              Status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="select select-bordered w-full md:w-1/2"
            >
              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="mb-2 block text-sm font-medium">
              Notes
            </label>

            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any notes about this class..."
              className="textarea textarea-bordered min-h-28 w-full"
            />
          </div>
        </div>
      </section>

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

export default ScheduleForm;
