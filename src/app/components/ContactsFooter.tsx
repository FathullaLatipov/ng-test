import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const LANGS = ["EN", "RU", "UZ"];

const CONTACTS = [
  {
    icon: <MapPin size={18} strokeWidth={1.2} />,
    label: "Address",
    value: "100084, Uzbekistan, Tashkent,\nMirabad district, Navoi st. 22A",
  },
  {
    icon: <Phone size={18} strokeWidth={1.2} />,
    label: "Phone",
    value: "+998 71 000 00 00",
  },
  {
    icon: <Mail size={18} strokeWidth={1.2} />,
    label: "Email",
    value: "info@nobelgroup.uz",
  },
];

const FOOTER_LINKS = [
  { title: "Company", links: ["About Group", "History", "Mission & Values", "Team"] },
  { title: "Business", links: ["Wholesale", "Distribution", "HoReCa", "Production"] },
  { title: "Brands", links: ["EcoBorn", "Dairy Direction", "Nobel Fresh", "Partner Brands"] },
];

export function ContactsFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lang, setLang] = useState("EN");
  const [formState, setFormState] = useState({ name: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Contact Section */}
      <section
        id="contact"
        ref={ref}
        style={{
          background: "#0A0A0A",
          padding: "120px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse at 50% 100%, rgba(201,162,75,0.06) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
          >
            <div style={{ width: 24, height: 1, background: "#C9A24B" }} />
            <span style={{ color: "#C9A24B", fontSize: 11, fontWeight: 600, letterSpacing: "0.3em" }}>
              GET IN TOUCH
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
            style={{
              fontSize: "clamp(36px, 4vw, 64px)",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              marginBottom: 80,
            }}
          >
            LET'S BUILD
            <br />
            <span style={{ color: "#C9A24B" }}>TOGETHER.</span>
          </motion.h2>

          {/* Content grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            {/* Left: Contact info */}
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: 40, marginBottom: 60 }}>
                {CONTACTS.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        border: "1px solid rgba(201,162,75,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#C9A24B",
                        flexShrink: 0,
                      }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          color: "#9A9A9A",
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.2em",
                          marginBottom: 6,
                        }}
                      >
                        {c.label.toUpperCase()}
                      </div>
                      <div
                        style={{
                          color: "#FFFFFF",
                          fontSize: 15,
                          fontWeight: 500,
                          lineHeight: 1.6,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {c.value}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
                style={{ display: "flex", gap: 12 }}
              >
                {["Telegram", "Instagram", "LinkedIn"].map((social) => (
                  <button
                    key={social}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#9A9A9A",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      padding: "10px 18px",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#C9A24B";
                      e.currentTarget.style.color = "#C9A24B";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.color = "#9A9A9A";
                    }}
                  >
                    {social}
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Right: Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(201,162,75,0.3)",
                    padding: "60px 48px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: "#C9A24B", fontSize: 40, marginBottom: 20 }}>✦</div>
                  <div style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                    Message Received
                  </div>
                  <div style={{ color: "#9A9A9A", fontSize: 14, lineHeight: 1.7 }}>
                    Our team will reach out within 24 hours to discuss partnership opportunities.
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {[
                      { key: "name", label: "Your Name", placeholder: "John Smith" },
                      { key: "company", label: "Company", placeholder: "Retail Group LLC" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label
                          style={{
                            display: "block",
                            color: "#9A9A9A",
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            marginBottom: 8,
                          }}
                        >
                          {field.label.toUpperCase()}
                        </label>
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          value={formState[field.key as keyof typeof formState]}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, [field.key]: e.target.value }))
                          }
                          style={{
                            width: "100%",
                            background: "#111111",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#FFFFFF",
                            fontSize: 15,
                            fontWeight: 400,
                            padding: "14px 18px",
                            outline: "none",
                            fontFamily: "Manrope, sans-serif",
                            boxSizing: "border-box",
                            transition: "border-color 0.3s",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(201,162,75,0.5)")}
                          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        style={{
                          display: "block",
                          color: "#9A9A9A",
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.2em",
                          marginBottom: 8,
                        }}
                      >
                        MESSAGE
                      </label>
                      <textarea
                        placeholder="Tell us about your business and how we can collaborate..."
                        rows={5}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, message: e.target.value }))
                        }
                        style={{
                          width: "100%",
                          background: "#111111",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#FFFFFF",
                          fontSize: 15,
                          fontWeight: 400,
                          padding: "14px 18px",
                          outline: "none",
                          fontFamily: "Manrope, sans-serif",
                          resize: "vertical",
                          boxSizing: "border-box",
                          transition: "border-color 0.3s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(201,162,75,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        background: "#C9A24B",
                        border: "none",
                        color: "#0A0A0A",
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        padding: "16px 36px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        justifyContent: "center",
                        transition: "all 0.35s",
                        fontFamily: "Manrope, sans-serif",
                        alignSelf: "flex-start",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#D4AF37";
                        e.currentTarget.style.boxShadow = "0 0 24px rgba(201,162,75,0.45)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#C9A24B";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      SEND MESSAGE
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#080808",
          borderTop: "1px solid rgba(201,162,75,0.12)",
          padding: "64px 80px 40px",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          {/* Footer top row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "280px 1fr",
              gap: 80,
              marginBottom: 64,
            }}
          >
            {/* Logo + tagline */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    border: "2px solid #C9A24B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: "rotate(45deg)",
                  }}
                >
                  <div style={{ width: 8, height: 8, background: "#C9A24B" }} />
                </div>
                <div>
                  <div style={{ color: "#FFFFFF", fontSize: 15, fontWeight: 800, letterSpacing: "0.12em" }}>
                    NOBEL
                  </div>
                  <div style={{ color: "#C9A24B", fontSize: 8, fontWeight: 500, letterSpacing: "0.35em", marginTop: 1 }}>
                    GROUP
                  </div>
                </div>
              </div>
              <p
                style={{
                  color: "#9A9A9A",
                  fontSize: 13,
                  fontWeight: 400,
                  lineHeight: 1.7,
                  marginBottom: 24,
                }}
              >
                Uzbekistan's leading food distribution holding. Building reliable supply ecosystems since 2010.
              </p>

              {/* Language switcher in footer */}
              <div style={{ display: "flex", gap: 4 }}>
                {LANGS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{
                      background: lang === l ? "rgba(201,162,75,0.12)" : "transparent",
                      border: lang === l ? "1px solid rgba(201,162,75,0.4)" : "1px solid rgba(255,255,255,0.08)",
                      cursor: "pointer",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: lang === l ? "#C9A24B" : "#9A9A9A",
                      padding: "6px 14px",
                      transition: "all 0.3s",
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer nav columns */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 40,
              }}
            >
              {FOOTER_LINKS.map((col) => (
                <div key={col.title}>
                  <div
                    style={{
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      marginBottom: 20,
                      paddingBottom: 12,
                      borderBottom: "1px solid rgba(201,162,75,0.15)",
                    }}
                  >
                    {col.title.toUpperCase()}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {col.links.map((link) => (
                      <a
                        key={link}
                        href="#"
                        style={{
                          color: "#9A9A9A",
                          textDecoration: "none",
                          fontSize: 13,
                          fontWeight: 400,
                          transition: "color 0.3s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A24B")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#9A9A9A")}
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer bottom bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ color: "#9A9A9A", fontSize: 12, fontWeight: 400, letterSpacing: "0.04em" }}>
              © 2024 Nobel Group. All rights reserved.
            </div>

            {/* Animated gold accent */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div style={{ width: 40, height: 1, background: "linear-gradient(to right, transparent, #C9A24B)" }} />
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#C9A24B" }} />
              <div style={{ width: 40, height: 1, background: "linear-gradient(to left, transparent, #C9A24B)" }} />
            </motion.div>

            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Use"].map((item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    color: "#9A9A9A",
                    textDecoration: "none",
                    fontSize: 12,
                    fontWeight: 400,
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A24B")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9A9A9A")}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
