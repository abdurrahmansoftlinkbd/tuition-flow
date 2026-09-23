import { Link } from "react-router";

const Home = () => {
  const features = [
    {
      title: "Student Management",
      description:
        "Keep student information organized in one place. Add, update, and manage your tuition students easily.",
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
            d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-8a4 4 0 110 8 4 4 0 010-8zm8 4a3 3 0 10-6 0 3 3 0 006 0z"
          />
        </svg>
      ),
    },
    {
      title: "Tuition Tracking",
      description:
        "Track monthly tuition payments, outstanding dues, and payment history without maintaining separate notebooks.",
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
            d="M12 8c-2.21 0-4 1.12-4 2.5S9.79 13 12 13s4 1.12 4 2.5S14.21 18 12 18m0-10V6m0 2c2.21 0 4 1.12 4 2.5M12 8c-2.21 0-4 1.12-4 2.5M12 18v-2"
          />
        </svg>
      ),
    },
    {
      title: "Attendance & Schedule",
      description:
        "Stay on top of classes with simple attendance records and a clear view of your upcoming tuition schedule.",
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

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Navbar */}
      <header className="border-b border-base-200 bg-base-100/95 backdrop-blur">
        <div className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </div>

              <span className="text-xl font-bold tracking-tight">
                TuitionFlow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="menu menu-horizontal gap-1">
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#how-it-works">How It Works</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex-none">
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/login" className="btn btn-ghost btn-sm">
                Login
              </Link>

              <Link to="/register" className="btn btn-primary btn-sm px-5">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu */}
            <div className="dropdown dropdown-end sm:hidden">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-square"
                aria-label="Open navigation menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-base-200 bg-base-100 p-2 shadow-lg"
              >
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#how-it-works">How It Works</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Get Started</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
            {/* Hero Content */}
            <div>
              <div className="badge badge-primary badge-outline mb-5 px-4 py-3">
                Simple tuition management
              </div>

              <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Manage your tuition,
                <span className="text-primary"> effortlessly.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-base-content/70 sm:text-lg">
                TuitionFlow helps tutors organize students, track tuition
                payments, manage attendance, and stay on top of every class from
                one simple platform.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/register" className="btn btn-primary px-6">
                  Get Started Free
                </Link>

                <a href="#features" className="btn btn-outline px-6">
                  Explore Features
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-base-content/60">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Easy to use
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Organized records
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Built for tutors
                </span>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative">
              <div className="rounded-2xl border border-base-200 bg-base-100 p-4 shadow-xl sm:p-6">
                {/* Preview Header */}
                <div className="flex items-center justify-between border-b border-base-200 pb-4">
                  <div>
                    <p className="text-sm text-base-content/50">Dashboard</p>
                    <h2 className="text-lg font-semibold">Good morning 👋</h2>
                  </div>

                  <div className="avatar placeholder">
                    <div className="w-10 rounded-full bg-primary text-primary-content">
                      <span className="text-sm">AR</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-base-200/60 p-4">
                    <p className="text-xs text-base-content/50">
                      Total Students
                    </p>
                    <p className="mt-1 text-2xl font-bold">24</p>
                  </div>

                  <div className="rounded-xl bg-base-200/60 p-4">
                    <p className="text-xs text-base-content/50">This Month</p>
                    <p className="mt-1 text-2xl font-bold">৳18,500</p>
                  </div>
                </div>

                {/* Payment Overview */}
                <div className="mt-5 rounded-xl border border-base-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Payment Overview</p>
                      <p className="text-xs text-base-content/50">
                        September 2026
                      </p>
                    </div>

                    <span className="badge badge-success badge-sm">
                      82% Paid
                    </span>
                  </div>

                  <progress
                    className="progress progress-primary mt-4 w-full"
                    value="82"
                    max="100"
                  />

                  <div className="mt-3 flex justify-between text-xs text-base-content/60">
                    <span>Collected: ৳18,500</span>
                    <span>Due: ৳4,000</span>
                  </div>
                </div>

                {/* Recent Students */}
                <div className="mt-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold">Recent Students</p>

                    <button className="link link-primary text-xs no-underline hover:underline">
                      View all
                    </button>
                  </div>

                  <div className="space-y-2">
                    {[
                      ["Nafisa Rahman", "৳1,500", "Paid"],
                      ["Sakib Hasan", "৳2,000", "Paid"],
                      ["Tanjim Ahmed", "৳1,500", "Due"],
                    ].map(([name, amount, status]) => (
                      <div
                        key={name}
                        className="flex items-center justify-between rounded-lg bg-base-200/40 px-3 py-3"
                      >
                        <div>
                          <p className="text-sm font-medium">{name}</p>
                          <p className="text-xs text-base-content/50">
                            Monthly tuition
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-semibold">{amount}</p>
                          <span
                            className={`text-xs ${
                              status === "Paid"
                                ? "text-success"
                                : "text-warning"
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Small floating card */}
              <div className="absolute -bottom-5 -left-3 hidden rounded-xl border border-base-200 bg-base-100 p-4 shadow-lg sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10 text-success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-xs text-base-content/50">
                      Latest payment
                    </p>
                    <p className="text-sm font-semibold">৳2,000 received</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-y border-base-200 bg-base-200/20"
        >
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Features
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to manage tuition
              </h2>

              <p className="mt-4 text-base leading-7 text-base-content/60">
                Replace scattered notebooks and spreadsheets with a clean,
                centralized tuition management system.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="card border border-base-200 bg-base-100 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="card-body p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {feature.icon}
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-2 leading-7 text-base-content/60">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                How It Works
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Simple from day one
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Add Students",
                  description:
                    "Create student profiles with their essential information and tuition details.",
                },
                {
                  number: "02",
                  title: "Track Everything",
                  description:
                    "Record attendance, tuition payments, dues, and class schedules from one dashboard.",
                },
                {
                  number: "03",
                  title: "Stay Organized",
                  description:
                    "Get a clear overview of your tuition activities and never lose track of important records.",
                },
              ].map((step) => (
                <div key={step.number} className="relative">
                  <span className="text-5xl font-bold text-primary/15">
                    {step.number}
                  </span>

                  <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>

                  <p className="mt-3 leading-7 text-base-content/60">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="about" className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl bg-primary px-6 py-12 text-primary-content sm:px-12 lg:px-16">
              <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Bring your tuition management into one place.
                  </h2>

                  <p className="mt-4 max-w-xl text-primary-content/80">
                    Start organizing your students, payments, attendance, and
                    schedules with TuitionFlow.
                  </p>
                </div>

                <Link to="/register" className="btn btn-neutral px-6">
                  Create Your Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-base-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <Link to="/" className="text-lg font-bold tracking-tight">
              TuitionFlow
            </Link>

            <p className="mt-1 text-sm text-base-content/50">
              Manage students. Track tuition. Stay organized.
            </p>
          </div>

          <p className="text-sm text-base-content/50">
            © {new Date().getFullYear()} TuitionFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
