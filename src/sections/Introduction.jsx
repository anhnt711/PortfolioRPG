import introBgUrl from "@assets/bg/background.png";
import avatarUrl from "@assets/avatar.png";

const introCopy = {
  name: "NGUYEN TIEN ANH",
  role: "Full-stack Engineer",
  motto: "The most dangerous phrase is, We've always done it this way.",
};

export default function Introduction() {
  return (
    <section className="intro-cinematic" style={{ "--intro-bg": `url(${introBgUrl})` }}>
      <div className="intro-cinematic__content">
        <div className="intro-cinematic__glow" aria-hidden />
        <img className="intro-cinematic__avatar" src={avatarUrl} alt="Nguyen Tien Anh avatar" />
        <p className="intro-cinematic__eyebrow">Information</p>
        <h1 className="intro-cinematic__name">{introCopy.name}</h1>
        <p className="intro-cinematic__role">{introCopy.role}</p>
        <p className="intro-cinematic__motto">{introCopy.motto}</p>
        <span className="intro-cinematic__rule" aria-hidden />
        <div className="intro-cinematic__actions">
          <a className="intro-cta intro-cta--primary" href="#projects">Inspect</a>
          <a className="intro-cta" href="#contact">Recruit</a>
        </div>
      </div>
    </section>
  );
}
