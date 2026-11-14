const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WeekPage() {
  return (
    <main>
      <h1 className="text-3xl font-bold tracking-tight">
        Week
      </h1>

      <p className="mt-2 text-slate-600">
        Build a realistic plan for your week.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-7">
        {weekdays.map((day) => (
          <section
            key={day}
            aria-label={day}
            className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4"
          >
            <h2 className="font-semibold">{day}</h2>

            <p className="mt-4 text-sm text-slate-500">
              No tasks planned.
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}