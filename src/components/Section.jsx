import SectionHeading from "../components/SectionHeading";

export default function Section({
  id,
  title,
  children,
  subline,
  showHeading = true,
  classname = "",
  maxWidthClass = "max-w-6xl",
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div
        className={`relative z-10 w-full ${maxWidthClass} px-6 py-24 mx-auto ${classname}`.trim()}
      >
        {showHeading && (
          <SectionHeading overline="NEWS & UPDATES" title={title} subline={subline} />
        )}
        {children}
      </div>
    </section>
  );
}
