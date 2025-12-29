import React, { useMemo, useState } from "react";

function Icon({ kind }) {
  const common = "w-4 h-4";
  switch (kind) {
    case "email":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "phone":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M7 3h3l1 5-2 1c1 3 3 5 6 6l1-2 5 1v3c0 1-1 2-2 2C10 21 3 14 3 5c0-1 1-2 2-2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "github":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2a10 10 0 0 0-3 19.5c.5.1.7-.2.7-.5v-1.7c-3 .6-3.6-1.3-3.6-1.3-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.8 1.6-.8.1-.7.4-1.1.7-1.3-2.4-.3-4.9-1.2-4.9-5.4 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.2 10.2 0 0 1 5.5 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.2-2.5 5.1-4.9 5.4.4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path d="M6 9v12" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M6 6.5v.2"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M10 21V9h4v2c.6-1 1.7-2 3.5-2 3 0 4.5 2 4.5 5.4V21"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M10 9h4" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "cv":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path d="M7 3h7l3 3v15H7V3Z" stroke="currentColor" strokeWidth="1.6" />
          <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 11h6M9 15h6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "location":
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
  }
}

export default function ContactSection() {
  const [toast, setToast] = useState(null);

  const items = useMemo(
    () => [
      {
        kind: "email",
        label: "Email",
        hint: "Send Raven",
        value: "tienanh7.11.99@gmail.com",
        href: "mailto:tienanh7.11.99@gmail.com",
      },
      {
        kind: "phone",
        label: "Phone",
        hint: "Crystal Call",
        value: "+84 33 482 7440",
        href: "tel:+84334827440",
      },
      {
        kind: "github",
        label: "GitHub",
        hint: "Forge Repo",
        value: "https://github.com/anhnt711",
        href: "https://github.com/anhnt711",
      },
      {
        kind: "location",
        label: "Location",
        hint: "Base Camp",
        value: "Hanoi, VN (GMT+7)",
        href: "https://www.google.com/maps?q=Hanoi",
      },
    ],
    []
  );

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copied to clipboard");
      window.setTimeout(() => setToast(null), 1200);
    } catch {
      setToast("Copy failed");
      window.setTimeout(() => setToast(null), 1200);
    }
  };

  return (
    <section id="contact" className="relative w-full">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/35" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-[340px_1fr] md:items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-wide text-[#e7d7b5]">
              Contact
            </h2>
            <div className="mt-2 h-px w-20 bg-[#c9a86a]/70" />
            <p className="mt-4 text-sm leading-6 text-[#d9caa8]/80">
              Leave a trail, I will find it. Prefer email for work inquiries.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-[#c9a86a]/40 bg-black/30 px-3 py-1 text-xs text-[#e7d7b5]">
                Open to work
              </span>
              <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-white/80">
                GMT+7
              </span>
            </div>

            <p className="mt-6 text-xs text-white">
              Typical response time: under 24 hours.
            </p>
          </div>

          {/* RIGHT */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur">
            {/* subtle gold glow line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a86a]/60 to-transparent" />

            <div className="p-5 md:p-7">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#c9a86a]/80">
                    Guild Contact Ledger
                  </p>
                  <p className="mt-1 text-sm text-white/75">
                    Choose a channel. Copy or open instantly.
                  </p>
                </div>

                {toast ? (
                  <span className="rounded-full border border-[#c9a86a]/30 bg-black/40 px-3 py-1 text-xs text-[#e7d7b5]">
                    {toast}
                  </span>
                ) : null}
              </div>

              <div className="grid gap-3">
                {items.map((it) => {
                  const isExternal =
                    it.kind === "cv" ||
                    it.kind === "github" ||
                    it.kind === "linkedin" ||
                    it.kind === "location";

                  return (
                    <div
                      key={it.label}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[#c9a86a]/35 hover:bg-white/7"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/25 text-[#e7d7b5]">
                          <Icon kind={it.kind} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-white/90">
                              {it.label}
                            </p>
                            <span className="text-xs text-[#c9a86a]/80">
                              • {it.hint}
                            </span>
                          </div>
                          <p className="truncate text-xs text-white">
                            {it.value}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          onClick={() => copy(it.value)}
                          className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-xs text-white/80 transition hover:border-[#c9a86a]/35 hover:text-white"
                          type="button"
                        >
                          Copy
                        </button>

                        <a
                          href={it.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                          className="rounded-lg border border-[#c9a86a]/25 bg-[#c9a86a]/10 px-3 py-2 text-xs text-[#e7d7b5] transition hover:border-[#c9a86a]/45 hover:bg-[#c9a86a]/15"
                        >
                          Open
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <p className="text-xs text-white/55">
                  For hiring: email is the fastest route.
                </p>
                <span className="text-xs text-[#c9a86a]/75">
                  “Clarity first. Ship small.”
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
