import { useEffect, useState } from "react";

const defaultForm = {
  name: "",
  phone: "",
  email: "",
  classLevel: "",
  subject: "",
  monthlyFee: "",
  days: [],
  preferredTime: "",
  guardianName: "",
  address: "",
  status: "Active",
  joinedDate: "",
  notes: "",
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

const classOptions = [
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "SSC",
  "HSC",
  "University",
];

const subjectOptions = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "English",
  "Bangla",
  "General Mathematics",
  "ICT",
  "Other",
];

const StudentForm = ({
  initialData = null,
  onSubmit,
  submitText = "Save Student",
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState(defaultForm);

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...defaultForm,
        ...initialData,
        monthlyFee: initialData.monthlyFee?.toString() || "",
        days: initialData.days || [],
      });
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleDayChange = (day) => {
    setFormData((previous) => {
      const selectedDays = previous.days.includes(day)
        ? previous.days.filter((item) => item !== day)
        : [...previous.days, day];

      return {
        ...previous,
        days: selectedDays,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("Please enter the student's name.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter a phone number.");
      return;
    }

    if (!formData.classLevel) {
      setError("Please select the student's class.");
      return;
    }

    if (!formData.subject) {
      setError("Please select a subject.");
      return;
    }

    if (!formData.monthlyFee) {
      setError("Please enter the monthly tuition fee.");
      return;
    }

    if (!formData.guardianName.trim()) {
      setError("Please enter the guardian's name.");
      return;
    }

    if (formData.days.length === 0) {
      setError("Please select at least one class day.");
      return;
    }

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      guardianName: formData.guardianName.trim(),
      address: formData.address.trim(),
      monthlyFee: Number(formData.monthlyFee),
      notes: formData.notes.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <section>
        <div className="mb-5">
          <h3 className="font-semibold">Basic Information</h3>

          <p className="mt-1 text-sm text-base-content/50">
            Add the student's basic academic and contact information.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Student Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter student name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01XXXXXXXXX"
              className="input input-bordered w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
              <span className="ml-1 text-xs text-base-content/40">
                (Optional)
              </span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              className="input input-bordered w-full"
            />
          </div>

          {/* Guardian */}
          <div>
            <label
              htmlFor="guardianName"
              className="mb-2 block text-sm font-medium"
            >
              Guardian Name
            </label>

            <input
              id="guardianName"
              name="guardianName"
              type="text"
              value={formData.guardianName}
              onChange={handleChange}
              placeholder="Enter guardian name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Class */}
          <div>
            <label
              htmlFor="classLevel"
              className="mb-2 block text-sm font-medium"
            >
              Class
            </label>

            <select
              id="classLevel"
              name="classLevel"
              value={formData.classLevel}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select class</option>

              {classOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
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

              {subjectOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Tuition & Schedule */}
      <section>
        <div className="mb-5">
          <h3 className="font-semibold">Tuition & Schedule</h3>

          <p className="mt-1 text-sm text-base-content/50">
            Configure the student's tuition and regular class schedule.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Monthly Fee */}
          <div>
            <label
              htmlFor="monthlyFee"
              className="mb-2 block text-sm font-medium"
            >
              Monthly Tuition Fee
            </label>

            <label className="input input-bordered flex w-full items-center gap-2">
              <span className="text-base-content/50">৳</span>

              <input
                id="monthlyFee"
                name="monthlyFee"
                type="number"
                min="0"
                value={formData.monthlyFee}
                onChange={handleChange}
                placeholder="1500"
                className="grow"
              />
            </label>
          </div>

          {/* Preferred Time */}
          <div>
            <label
              htmlFor="preferredTime"
              className="mb-2 block text-sm font-medium"
            >
              Class Time
            </label>

            <input
              id="preferredTime"
              name="preferredTime"
              type="time"
              value={formData.preferredTime}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Joined Date */}
          <div>
            <label
              htmlFor="joinedDate"
              className="mb-2 block text-sm font-medium"
            >
              Joining Date
            </label>

            <input
              id="joinedDate"
              name="joinedDate"
              type="date"
              value={formData.joinedDate}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

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
              className="select select-bordered w-full"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Days */}
          <div className="md:col-span-2">
            <label className="mb-3 block text-sm font-medium">Class Days</label>

            <div className="flex flex-wrap gap-2">
              {dayOptions.map((day) => {
                const isSelected = formData.days.includes(day);

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayChange(day)}
                    className={`btn btn-sm ${
                      isSelected ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Additional Information */}
      <section>
        <div className="mb-5">
          <h3 className="font-semibold">Additional Information</h3>
        </div>

        <div className="space-y-5">
          {/* Address */}
          <div>
            <label htmlFor="address" className="mb-2 block text-sm font-medium">
              Address
            </label>

            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter student's address"
              className="textarea textarea-bordered min-h-24 w-full"
            />
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
              placeholder="Add any useful notes about the student..."
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

      {/* Submit */}
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

export default StudentForm;
