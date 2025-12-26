// src/components/SectionHeading.jsx
export default function SectionHeading({
  title = "Introduction",
  subline = "skill & identity",
  tagline,
  fullRule = false,
}) {
  return (
    <div className={`bg3-banner ${fullRule ? "bg3-banner--full" : ""}`}>
      <div className="bg3-banner__inner">
        <div className="bg3-banner__text">
          <h2 className="bg3-banner__title font-serif">{title}</h2>

          {tagline ? (
            <div className="bg3-banner__tagline-wrap">
              <span className="bg3-banner__rule bg3-banner__rule--full" />
              <p className="bg3-banner__tagline">{tagline}</p>
            </div>
          ) : (
            <div className="bg3-banner__subwrap">
              <span className="bg3-banner__rule" />
              <svg
                className="bg3-banner__arrow"
                width="18"
                height="8"
                viewBox="0 0 18 8"
                fill="currentColor"
                aria-hidden
              >
                <path d="M0 4h14l-2.5-3L18 4l-6.5 3L14 4H0z" />
              </svg>
              <p className="bg3-banner__subline">{subline}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
