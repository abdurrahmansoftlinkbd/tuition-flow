import { Link, useNavigate, useParams } from "react-router";

import ScheduleForm from "../../../components/schedule/ScheduleForm";
import { useSchedules } from "../../../context/ScheduleContext";

const EditSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getScheduleById, updateSchedule } = useSchedules();

  const schedule = getScheduleById(id);

  if (!schedule) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-base-200 bg-base-100 p-10 text-center shadow-sm">
          <h2 className="text-xl font-bold">Schedule not found</h2>

          <p className="mt-2 text-sm text-base-content/50">
            The schedule you are looking for does not exist.
          </p>

          <Link to="/dashboard/schedule" className="btn btn-primary mt-6">
            Back to Schedule
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (scheduleData) => {
    updateSchedule(id, scheduleData);

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

          <li>Edit Class</li>
        </ul>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Edit Class
        </h2>

        <p className="mt-2 text-sm text-base-content/60">
          Update the class schedule information.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm sm:p-8">
        <ScheduleForm
          initialData={schedule}
          onSubmit={handleSubmit}
          submitText="Update Class"
        />
      </div>
    </div>
  );
};

export default EditSchedule;
