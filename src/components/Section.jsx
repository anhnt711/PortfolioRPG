import SectionHeading from "../components/SectionHeading";

export default function Section({ id, title, children, subline }) {
  const isIntro = id === "info" || id === "information";
  return (
    <section id={id} className="scroll-mt-24">
        <SectionHeading overline="NEWS & UPDATES" title={title} subline={subline} />
      {children}
    </section>
  );
}
