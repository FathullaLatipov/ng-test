import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Clock, ExternalLink, Instagram, Mail, MapPin, Navigation, Phone, Send, type LucideIcon } from "lucide-react";
import { PageLayout } from "../components/PageLayout";
import { PageHero } from "../components/PageHero";
import bannerContacts from "../../assets/contacts.webp";
import { useCms } from "../cms/store";
import {
  SectionDivider,
  QuoteBand,
  IbmGrid,
  LogisticsMesh,
} from "../components/BrandDecor";

const GOLD = "#C9A24B";

/** "+998 71 209 33 35" → "+998712093335" (for tel:) */
const telHref = (phone: string) => "tel:" + phone.replace(/[^\d+]/g, "");

/** "https://www.instagram.com/nobeltrade/?igsh=…" → "@nobeltrade" */
const handle = (url: string) => {
  const m = url.match(/(?:instagram\.com|t\.me)\/([^/?#]+)/i);
  return m ? "@" + m[1] : url.replace(/^https?:\/\/(www\.)?/, "");
};

type Row = { key: string; icon: LucideIcon; label: string; value: string; href?: string; external?: boolean; hint?: string };

export function ContactsPage() {
  const { data } = useCms();
  const c = data.contact;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const address = c.address.trim();
  const mapQuery = (c.mapQuery || address).trim();
  const q = encodeURIComponent(mapQuery);

  const rows: Row[] = [
    { key: "phone", icon: Phone, label: "ТЕЛЕФОН", value: c.phone.trim(), href: c.phone.trim() ? telHref(c.phone) : undefined, hint: "Позвонить" },
    { key: "address", icon: MapPin, label: "АДРЕС", value: address, href: address ? `https://www.google.com/maps/search/?api=1&query=${q}` : undefined, external: true, hint: "Открыть на карте" },
    { key: "instagram", icon: Instagram, label: "INSTAGRAM", value: c.instagram ? handle(c.instagram) : "", href: c.instagram || undefined, external: true, hint: "Перейти в Instagram" },
    { key: "telegram", icon: Send, label: "TELEGRAM", value: c.telegram ? handle(c.telegram) : "", href: c.telegram || undefined, external: true, hint: "Написать в Telegram" },
    { key: "email", icon: Mail, label: "EMAIL", value: c.email.trim(), href: c.email.trim() ? `mailto:${c.email.trim()}` : undefined, hint: "Написать на email" },
    { key: "hours", icon: Clock, label: "ЧАСЫ РАБОТЫ", value: c.hours.trim() },
  ].filter((r) => r.value);

  return (
    <PageLayout title="Контакты — Nobel Group" description={`Контакты Nobel Group: ${c.phone || ""} ${address ? "· " + address : ""}. Напишите нам через форму или в мессенджеры.`.replace(/\s+/g, " ").trim()}>
      <PageHero
        eyebrow="КОНТАКТЫ"
        title="Связаться"
        titleAccent="с Nobel Group."
        subtitle="Позвоните, напишите в мессенджеры или оставьте обращение через форму — ответственный сотрудник свяжется с вами."
        crumbs={[{ label: "Контакты" }]}
        bgImage={bannerContacts}
        bgImagePosition="right 38%"
      />

      <section
        ref={ref}
        className="ng-sec-pad"
        style={{ background: "var(--ng-charcoal)", padding: "90px 40px 80px", position: "relative", overflow: "hidden" }}
      >
        <IbmGrid opacity={0.02} />
        <LogisticsMesh opacity={0.06} />
        <div style={{ maxWidth: 1500, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="ng-grid-2" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, alignItems: "stretch" }}>
            {/* ─── contact cards ─── */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{ width: 24, height: 1, background: GOLD }} />
                <span style={{ color: GOLD, fontSize: 13, fontWeight: 600, letterSpacing: "0.24em" }}>КАК С НАМИ СВЯЗАТЬСЯ</span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08 }} style={{ margin: "0 0 28px", color: "#fff", fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Мы на связи <span style={{ color: GOLD }}>каждый день.</span>
              </motion.h2>

              <div style={{ display: "grid", gap: 12 }}>
                {rows.map((r, i) => {
                  const Icon = r.icon;
                  const inner = (
                    <>
                      <span className="ng-contact-icon"><Icon size={24} strokeWidth={1.6} /></span>
                      <span style={{ minWidth: 0, flex: 1 }}>
                        <span style={{ display: "block", color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", marginBottom: 5 }}>{r.label}</span>
                        <span style={{ display: "block", color: "#fff", fontSize: r.key === "phone" ? 24 : 18, fontWeight: r.key === "phone" ? 800 : 600, lineHeight: 1.35, wordBreak: "break-word" }}>{r.value}</span>
                      </span>
                      {r.href && <ExternalLink className="ng-contact-go" size={18} />}
                    </>
                  );
                  return (
                    <motion.div key={r.key} initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 + i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                      {r.href ? (
                        <a className="ng-contact-card" href={r.href} {...(r.external ? { target: "_blank", rel: "noreferrer" } : {})} aria-label={`${r.label}: ${r.value}. ${r.hint ?? ""}`}>
                          {inner}
                        </a>
                      ) : (
                        <div className="ng-contact-card ng-contact-card-static">{inner}</div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ─── map ─── */}
            {address && (
              <motion.div initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
                <div className="ng-map-frame">
                  <iframe
                    title={`Карта: ${address}`}
                    src={`https://www.google.com/maps?q=${q}&hl=ru&z=16&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <div className="ng-map-badge">
                    <MapPin size={18} color={GOLD} />
                    <span>{address}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  <a className="ng-map-btn" href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noreferrer"><Navigation size={16} /> Построить маршрут</a>
                  <a className="ng-map-btn ng-map-btn-ghost" href={`https://yandex.uz/maps/?text=${q}`} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Яндекс Карты</a>
                  <a className="ng-map-btn ng-map-btn-ghost" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Google Maps</a>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </section>

      <QuoteBand
        quote="Официальный контакт — это первый шаг к долгосрочному партнёрству."
        author="Nobel Group"
        role="Служба партнёрств"
      />

      <SectionDivider mark="hex" />
    </PageLayout>
  );
}
