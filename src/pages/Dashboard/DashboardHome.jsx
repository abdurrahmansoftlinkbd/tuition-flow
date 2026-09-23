const DashboardHome = () => {
  const stats = [
    {
      title: "Total Students",
      value: "24",
      description: "3 new this month",
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
      value: "৳18,500",
      description: "82% of total tuition",
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
      value: "৳4,000",
      description: "4 students have dues",
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
      title: "Classes Today",
      value: "5",
      description: "Next class at 6:00 PM",
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  const recentPayments = [
    {
      student: "Nafisa Rahman",
      amount: "৳1,500",
      date: "23 Sep 2026",
      status: "Paid",
    },
    {
      student: "Sakib Hasan",
      amount: "৳2,000",
      date: "22 Sep 2026",
      status: "Paid",
    },
    {
      student: "Tanjim Ahmed",
      amount: "৳1,500",
      date: "21 Sep 2026",
      status: "Paid",
    },
    {
      student: "Maliha Islam",
      amount: "৳1,500",
      date: "20 Sep 2026",
      status: "Paid",
    },
  ];

  const upcomingClasses = [
    {
      student: "Nafisa Rahman",
      subject: "Mathematics",
      time: "6:00 PM",
    },
    {
      student: "Sakib Hasan",
      subject: "Physics",
      time: "7:00 PM",
    },
    {
      student: "Tanjim Ahmed",
      subject: "Mathematics",
      time: "9:00 PM",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Heading */}
      <div>
        <p className="text-sm text-base-content/50">
          Wednesday, 23 September 2026
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome back, Abdur Rahman
        </h2>

        <p className="mt-2 text-sm text-base-content/60">
          Here is what is happening with your tuition today.
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

            <p className="mt-4 text-xs text-base-content/50">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Recent Payments */}
        <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-base-200 px-5 py-4">
            <div>
              <h3 className="font-semibold">Recent Payments</h3>

              <p className="mt-1 text-xs text-base-content/50">
                Latest tuition payments
              </p>
            </div>

            <button className="btn btn-ghost btn-sm text-primary">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment.student}>
                    <td>
                      <div>
                        <p className="font-medium">{payment.student}</p>
                      </div>
                    </td>

                    <td className="font-semibold">{payment.amount}</td>

                    <td className="text-base-content/60">{payment.date}</td>

                    <td>
                      <span className="badge badge-success badge-sm">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="rounded-xl border border-base-200 bg-base-100 shadow-sm">
          <div className="border-b border-base-200 px-5 py-4">
            <h3 className="font-semibold">Upcoming Classes</h3>

            <p className="mt-1 text-xs text-base-content/50">
              Your schedule for today
            </p>
          </div>

          <div className="space-y-3 p-5">
            {upcomingClasses.map((item) => (
              <div
                key={`${item.student}-${item.time}`}
                className="rounded-lg border border-base-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.student}</p>

                    <p className="mt-1 text-xs text-base-content/50">
                      {item.subject}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-primary">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collection Progress + Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Collection */}
        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">September Collection</h3>

              <p className="mt-1 text-xs text-base-content/50">
                Monthly tuition progress
              </p>
            </div>

            <span className="text-sm font-semibold text-primary">82%</span>
          </div>

          <progress
            className="progress progress-primary mt-5 w-full"
            value="82"
            max="100"
          />

          <div className="mt-4 flex justify-between text-sm">
            <span className="text-base-content/60">Collected</span>

            <span className="font-semibold">৳18,500 / ৳22,500</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <h3 className="font-semibold">Quick Actions</h3>

          <p className="mt-1 text-xs text-base-content/50">
            Common actions you may need
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button className="btn btn-primary">Add Student</button>

            <button className="btn btn-outline">Record Payment</button>

            <button className="btn btn-outline">Mark Attendance</button>

            <button className="btn btn-outline">View Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
