import { Link } from "react-router";

import { useAuth } from "../../context/AuthContext";
import { useStudents } from "../../context/StudentContext";
import { usePayments } from "../../context/PaymentContext";

const formatDate = () => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const DashboardHome = () => {
  const { user } = useAuth();
  const { students } = useStudents();
  const { payments, monthlySummary } = usePayments();

  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Tutor";

  const activeStudents = students.filter(
    (student) => student.status === "Active",
  );

  const recentPayments = [...payments]
    .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))
    .slice(0, 4);

  const getStudentName = (payment) => {
    const student = students.find((item) => item.id === payment.studentId);

    return student?.name || payment.studentName || "Unknown Student";
  };

  const stats = [
    {
      title: "Total Students",
      value: students.length,
      description: `${activeStudents.length} active students`,
      path: "/dashboard/students",
      action: "View Students",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m7-10a4 4 0 100-8 4 4 0 000 8zm7-1a3 3 0 100-6m4 16v-2a4 4 0 00-3-3.87"
          />
        </svg>
      ),
    },

    {
      title: "Monthly Collection",
      value: `৳${monthlySummary.collectedAmount.toLocaleString()}`,
      description: `${monthlySummary.collectionPercentage}% collected`,
      path: "/dashboard/payments",
      action: "View Payments",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-2.2 0-4 1.1-4 2.5S9.8 13 12 13s4 1.1 4 2.5S14.2 18 12 18m0-10V6m0 12v-2"
          />
        </svg>
      ),
    },

    {
      title: "Outstanding",
      value: `৳${monthlySummary.dueAmount.toLocaleString()}`,
      description: `${monthlySummary.dueStudents} students have dues`,
      path: "/dashboard/payments",
      action: "Check Dues",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v4m0 4h.01M10.3 4.1L3.7 15.5A2 2 0 005.4 18h13.2a2 2 0 001.7-2.5L13.7 4.1a2 2 0 00-3.4 0z"
          />
        </svg>
      ),
    },

    {
      title: "Monthly Target",
      value: `৳${monthlySummary.expectedAmount.toLocaleString()}`,
      description: "Expected tuition collection",
      path: "/dashboard/payments",
      action: "View Overview",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 19V5m0 14h16M8 15v-4m4 4V8m4 7v-6"
          />
        </svg>
      ),
    },
  ];

  const upcomingClasses = [
    {
      id: 1,
      student: "Nafisa Rahman",
      subject: "Mathematics",
      time: "6:00 PM",
    },
    {
      id: 2,
      student: "Sakib Hasan",
      subject: "Physics",
      time: "7:00 PM",
    },
    {
      id: 3,
      student: "Tanjim Ahmed",
      subject: "Mathematics",
      time: "9:00 PM",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm text-base-content/50">{formatDate()}</p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome back, {displayName}
        </h2>

        <p className="mt-2 text-sm text-base-content/60">
          Here is an overview of your tuition activities.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-base-content/50">{stat.title}</p>

                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {stat.icon}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <p className="text-xs text-base-content/50">{stat.description}</p>

              <Link
                to={stat.path}
                className="text-xs font-semibold text-primary hover:underline"
              >
                {stat.action}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Collection */}
      <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Monthly Collection</h3>

            <p className="mt-1 text-xs text-base-content/50">
              Tuition collection progress
            </p>
          </div>

          <span className="text-sm font-semibold text-primary">
            {monthlySummary.collectionPercentage}%
          </span>
        </div>

        <progress
          className="progress progress-primary mt-5 w-full"
          value={monthlySummary.collectionPercentage}
          max="100"
        />

        <div className="mt-4 flex flex-col justify-between gap-2 text-sm sm:flex-row">
          <span className="text-base-content/60">
            Collected: ৳{monthlySummary.collectedAmount.toLocaleString()}
          </span>

          <span className="text-base-content/60">
            Due: ৳{monthlySummary.dueAmount.toLocaleString()}
          </span>

          <span className="font-semibold">
            Target: ৳{monthlySummary.expectedAmount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Recent Payments */}
        <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-base-200 px-5 py-4">
            <div>
              <h3 className="font-semibold">Recent Payments</h3>

              <p className="mt-1 text-xs text-base-content/50">
                Latest tuition transactions
              </p>
            </div>

            <Link
              to="/dashboard/payments"
              className="btn btn-ghost btn-sm text-primary"
            >
              View All
            </Link>
          </div>

          {recentPayments.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-base-content/50">
                No payments have been recorded yet.
              </p>

              <Link
                to="/dashboard/payments/add"
                className="btn btn-primary btn-sm mt-4"
              >
                Record Payment
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Method</th>
                  </tr>
                </thead>

                <tbody>
                  {recentPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td>
                        <Link
                          to={`/dashboard/students/${payment.studentId}`}
                          className="font-medium hover:text-primary"
                        >
                          {getStudentName(payment)}
                        </Link>
                      </td>

                      <td className="font-semibold">
                        ৳{Number(payment.amount).toLocaleString()}
                      </td>

                      <td className="text-base-content/60">
                        {payment.paymentDate}
                      </td>

                      <td>
                        <span className="badge badge-outline badge-sm">
                          {payment.method}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <h3 className="font-semibold">Quick Actions</h3>

          <p className="mt-1 text-xs text-base-content/50">Common actions</p>

          <div className="mt-5 grid gap-3">
            <Link to="/dashboard/students/add" className="btn btn-primary">
              Add Student
            </Link>

            <Link to="/dashboard/payments/add" className="btn btn-outline">
              Record Payment
            </Link>

            <Link to="/dashboard/attendance" className="btn btn-outline">
              Mark Attendance
            </Link>

            <Link to="/dashboard/schedule" className="btn btn-outline">
              View Schedule
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm">
        <div className="flex items-center justify-between border-b border-base-200 px-5 py-4">
          <div>
            <h3 className="font-semibold">Upcoming Classes</h3>

            <p className="mt-1 text-xs text-base-content/50">
              Your upcoming tuition classes
            </p>
          </div>

          <Link
            to="/dashboard/schedule"
            className="text-xs font-semibold text-primary hover:underline"
          >
            View Schedule
          </Link>
        </div>

        <div className="grid gap-3 p-5 md:grid-cols-3">
          {upcomingClasses.map((item) => (
            <Link
              key={item.id}
              to="/dashboard/schedule"
              className="rounded-lg border border-base-200 p-4 transition hover:border-primary/30 hover:bg-base-200/30"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{item.student}</p>

                  <p className="mt-1 text-xs text-base-content/50">
                    {item.subject}
                  </p>
                </div>

                <span className="whitespace-nowrap text-sm font-semibold text-primary">
                  {item.time}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
