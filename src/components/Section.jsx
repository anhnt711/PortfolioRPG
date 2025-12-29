export default function Section({
  id,
  children,
  classname = "",
  maxWidthClass = "max-w-6xl",
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div
        className={`relative z-10 w-full ${maxWidthClass} mx-auto ${classname}`.trim()}
      >
        {children}
      </div>
    </section>
  );
}
