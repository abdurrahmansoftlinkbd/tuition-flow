import { Link, useNavigate } from "react-router";

import ScheduleForm from "../../../components/schedule/ScheduleForm";
import { useSchedules } from "../../../context/ScheduleContext";

const AddSchedule = () => {
  const navigate = useNavigate();

  const { addSchedule } = useSchedules();

  const handleSubmit = (scheduleData) => {
    addSchedule(scheduleData);

    navigate("/dashboard/schedule", {
      replace: true,
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Breadcrumb */}
      <div className="breadcrumbs p-0 text-sm">
        <ul>
          <li>
            <Link to="/dashboard/schedule">Schedule</Link>
          </li>

          <li>Add Class</li>
        </ul>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Add Class
        </h2>

        <p className="mt-2 text-sm text-base-content/60">
          Create a recurring tuition class schedule.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm sm:p-8">
        <ScheduleForm onSubmit={handleSubmit} submitText="Add Class" />
      </div>
    </div>
  );
};

export default AddSchedule;
