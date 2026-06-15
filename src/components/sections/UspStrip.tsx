const usps = [
  {
    title: "Ervaren & betrouwbaar",
    body: "Vakwerk door betrouwbare glazenwassers die afspraken nakomen.",
    icon: (
      <path d="M9 12l2 2 4-4M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3Z" />
    ),
  },
  {
    title: "Streepvrij osmosewater",
    body: "Gezuiverd water voor een langdurig helder resultaat, zonder chemicaliën.",
    icon: <path d="M12 2.5S5 10 5 15a7 7 0 0 0 14 0c0-5-7-12.5-7-12.5Z" />,
  },
  {
    title: "Flexibele afspraken",
    body: "Op een moment dat u uitkomt — ook in het weekend.",
    icon: (
      <>
        <rect x="3" y="4.5" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 2.5v4M16 2.5v4M9 14l2 2 4-4" />
      </>
    ),
  },
  {
    title: "Gratis & vrijblijvend",
    body: "Een eerlijke offerte vooraf, zonder verrassingen achteraf.",
    icon: (
      <>
        <path d="M12 3v18M7 7h7a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h8" />
      </>
    ),
  },
];

export function UspStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {usps.map((u) => (
          <div
            key={u.title}
            className="rounded-2xl border border-mist-200 bg-white p-5 shadow-sm shadow-navy-900/[0.03]"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-50 text-accent-600">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {u.icon}
              </svg>
            </span>
            <h3 className="mt-4 font-semibold text-navy-900">{u.title}</h3>
            <p className="mt-1.5 text-sm text-navy-800/75">{u.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
