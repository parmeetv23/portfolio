export default function Section({
  id,
  title,
  hint,
  children,
}: {
  id?: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {hint ? <p className="text-sm text-white/60">{hint}</p> : null}
      </div>
      {children}
    </section>
  );
}
