import SectionHeading from "../components/SectionHeading";

export default function Section({ id, title, children, subline ,classname}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="relative z-10 w-full max-w-6xl px-6 py-24 mx-auto">
        <SectionHeading overline="NEWS & UPDATES" title={title} subline={subline} />
        {children}
      </div>
    </section>
  );
}
