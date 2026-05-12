const metrics = [
  ["Schools", "42"],
  ["Teachers", "380"],
  ["Garden Activities", "124"],
  ["Resources", "290"]
];

export function OverviewCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(([k, v]) => (
        <article key={k} className="card p-5">
          <p className="text-sm text-slate-500">{k}</p>
          <p className="text-3xl font-semibold mt-2">{v}</p>
        </article>
      ))}
    </div>
  );
}
