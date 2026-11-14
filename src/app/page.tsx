export default function Home() {
  return (
    <main>
      <h1 className="text-3xl font-bold tracking-tight">
        Today
      </h1>

      <p className="mt-2 text-slate-600">
        Focus on what matters today.
      </p>

      <section
        aria-labelledby="tasks-heading"
        className="mt-8 rounded-2xl border border-slate-200 bg-white p-6"
      >
        <h2 id="tasks-heading" className="text-lg font-semibold">
          Your tasks
        </h2>

        <p className="mt-2 text-slate-500">
          No tasks planned for today.
        </p>
      </section>
    </main>
  );
}